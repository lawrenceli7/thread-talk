import { communityState } from "@/atoms/communitiesAtom";
import { Box, Divider, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSquareThreads } from "react-icons/fa6";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import CreateCommunityModal from "../../modal/community";
import MenuListItem from "./MenuListItem";

const Communities: React.FC = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <div className="dark:bg-[#0f1113]">
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box className="dark:bg-[#0f1113] mb-4">
        <Text
          fontSize="7pt"
          className="dark:text-gray-400 font-medium mb-1 pl-3 text-gray-500"
        >
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaSquareThreads}
              displayText={`thread/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="brand.100"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Divider />
      <Box className="dark:bg-[#0f1113] mt-3">
        <Text
          fontSize="7pt"
          className="dark:text-gray-400 pl-3 mb-1 font-medium text-gray-500"
        >
          MY COMMUNITIES
        </Text>
        <MenuItem
          fontSize="10pt"
          onClick={() => setOpen(true)}
          className="dark:bg-[#0f1113] dark:hover:bg-[#2a3236] w-full hover:bg-gray-100"
        >
          <Flex className="dark:text-white flex items-center">
            <Icon as={GrAdd} className="dark:text-white text-xl mr-2" />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaSquareThreads}
            displayText={`thread/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </div>
  );
};
export default Communities;
