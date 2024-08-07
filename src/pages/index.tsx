import { communityState } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postsAtom";
import CreatePostLink from "@/components/community/CreatePostLink";
import PageContent from "@/components/layout/PageContent";
import PostItem from "@/components/posts/PostItem";
import PostLoader from "@/components/posts/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const communityStateValue = useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const {
    setPostStateValue,
    postStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();

  const buildUserHomeFeed = () => {};

  const buildNoUserHomeFeed = async () => {
    setLoading(true);

    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    } catch (error: any) {
      console.error("Error building no user home feed: ", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDelete={onDeletePost}
                onVote={onVote}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <></>
    </PageContent>
  );
}
