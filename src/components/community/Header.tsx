import { Community } from "@/atoms/communitiesAtom";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaSquareThreads } from "react-icons/fa6";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex height="146px" className="w-full flex flex-col">
      <Box height="50%" className="bg-blue-400" />
      <Flex className="dark:bg-[#0f1113] dark:border-b flex justify-center bg-white flex-grow">
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Image"
              top={-3}
              color="blue.500"
              className="border-4 rounded-full relative"
            />
          ) : (
            <Icon
              as={FaSquareThreads}
              fontSize={64}
              top={-3}
              color="blue.500"
              className="rounded-full relative border-4"
            />
          )}
          <Flex padding="10px 16px">
            <Flex className="flex flex-col mr-6">
              <Text fontSize="16pt" className="dark:text-white font-extrabold">
                {communityData.id}
              </Text>
              <Text fontSize="10pt" className="font-semibold text-gray-400">
                thread/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              className="pl-6 pr-6"
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
