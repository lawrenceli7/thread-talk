import { Community } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";

type PostProps = {
  communityData: Community;
};

const Posts: React.FC<PostProps> = ({ communityData }) => {
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const [user] = useAuthState(auth);

  const getPosts = async () => {
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));

      console.log("posts", posts);
    } catch (error: any) {
      console.error("getPosts error", error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Stack>
      {postStateValue.posts.map((item) => (
        <PostItem
          post={item}
          userIsCreator={user?.uid === item.creatorId}
          userVoteValue={undefined}
          onVote={onVote}
          onDelete={onDeletePost}
          onSelectPost={onSelectPost}
          key={item.id}
        />
      ))}
    </Stack>
  );
};
export default Posts;
