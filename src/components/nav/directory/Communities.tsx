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
      <Box mb={4} className="dark:bg-[#0f1113]">
        <Text
          pl={3}
          mb={1}
          fontSize="7pt"
          fontWeight={500}
          color="gray.500"
          className="dark:text-gray-400"
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
      <Box mt={3} className="dark:bg-[#0f1113]">
        <Text
          pl={3}
          mb={1}
          fontSize="7pt"
          fontWeight={500}
          color="gray.500"
          className="dark:text-gray-400"
        >
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
          className="dark:bg-[#0f1113] dark:hover:bg-[#2a3236]"
        >
          <Flex align="center" className="dark:text-white">
            <Icon fontSize={20} mr={2} as={GrAdd} className="dark:text-white" />
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
