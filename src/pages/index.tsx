import { Post, PostVote } from "@/atoms/postsAtom";
import CreatePostLink from "@/components/community/CreatePostLink";
import PersonalHome from "@/components/community/PersonalHome";
import Premium from "@/components/community/Premium";
import Recommendations from "@/components/community/Recommendations";
import PageContent from "@/components/layout/PageContent";
import PostItem from "@/components/posts/PostItem";
import PostLoader from "@/components/posts/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
  } = usePosts();
  const { communityStateValue } = useCommunityData();

  const buildUserHomeFeed = async () => {
    setLoading(true);

    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );

        const postDocs = await getDocs(postQuery);

        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error: any) {
      console.log("buildUserHomeFeed error", error);
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

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
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("buildNoUserHomeFeed error", error);
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const getUserPostVotes = async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);

      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );

      const postVoteDocs = await getDocs(postVotesQuery);

      const postVotes = postVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error: any) {
      console.log("getUserPostVotes error", error);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityStateValue.snippetsFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, postStateValue.posts]);

  return (
    <div className="dark:bg-[#0f1113] h-screen">
      <PageContent>
        <div>
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
                  onDeletePost={onDeletePost}
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
        </div>
        <Stack spacing={5}>
          <Recommendations />
          <Premium />
          <PersonalHome />
        </Stack>
      </PageContent>
    </div>
  );
};

export default Home;
