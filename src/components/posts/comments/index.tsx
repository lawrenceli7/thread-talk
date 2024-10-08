import { Post, postState } from "@/atoms/postsAtom";
import { firestore } from "@/firebase/clientApp";
import {
  Box,
  Divider,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import CommentInput from "./CommentInput";
import CommentItem, { Comment } from "./CommentItem";

type CommentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    setCreateLoading(true);

    try {
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      setCommentText("");
      setComments((prev) => [newComment, ...prev]);

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error: any) {
      console.log("onCreateComment error", error);
      console.log(error.message);
      toast.error(error.message);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async (comment: Comment) => {
    setLoadingDeleteId(comment.id);

    try {
      const batch = writeBatch(firestore);

      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error: any) {
      console.log("onDeleteComment error", error);
      console.log(error.message);
      toast.error(error.message);
    }
    setLoadingDeleteId("");
  };

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );

      const commentDocs = await getDocs(commentsQuery);

      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log("getPostComments error", error);
      console.log(error.message);
      toast.error(error.message);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  return (
    <Box className="dark:bg-black bg-white p-2 rounded-b">
      <Flex fontSize="10pt" className="flex flex-col pl-10 pr-4 mb-6 w-full">
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} className="p-2">
        {fetchLoading ? (
          <div>
            {[0, 1, 2].map((item) => (
              <Box key={item} className="dark:bg-black bg-white p-6">
                <SkeletonCircle size="10" />
                <SkeletonText noOfLines={2} spacing="4" className="mt-4" />
              </Box>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {comments.length === 0 ? (
              <Flex className="flex flex-col justify-center items-center border-t border-gray-100 p-20">
                <Text className="dark:text-white font-bold opacity-30">
                  No Comments Yet
                </Text>
              </Flex>
            ) : (
              <div className="flex flex-col gap-6">
                <Divider />
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDeleteId === comment.id}
                    userId={user?.uid}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
