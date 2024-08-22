import About from "@/components/community/About";
import PageContent from "@/components/layout/PageContent";
import NewPostForm from "@/components/posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();

  return (
    <PageContent>
      <div>
        <Box p="14px 0px" className="border-b border-white">
          <Text className="dark:text-white">Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </div>
      <div>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </div>
    </PageContent>
  );
};
export default SubmitPostPage;
