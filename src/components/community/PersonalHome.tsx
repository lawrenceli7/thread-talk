import { authModalState } from "@/atoms/authModalAtom";
import CreateCommunityModal from "@/components/modal/community";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineTeam } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const PersonalHome: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;

    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }

    toggleMenuOpen();
  };

  return (
    <div>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Flex className="dark:bg-black flex flex-col bg-white cursor-pointer rounded border border-gray-300 sticky">
        <Flex
          p="6px 10px"
          height="34px"
          borderRadius="4px 4px 0px 0px"
          className="dark:bg-[#2a3236] flex items-end text-white bg-blue-500 font-semibold"
        ></Flex>
        <Flex className="flex flex-col p-6">
          <Flex className="flex items-center mb-2">
            <Icon as={FaHome} fontSize={50} color="blue.500" className="mr-2" />
            <Text className="dark:text-white font-semibold">Home</Text>
          </Flex>
          <Stack spacing={3}>
            <Text fontSize="9pt" className="dark:text-white">
              Your personal Thread Talk front page, built just for you.
            </Text>
            <Button
              height="30px"
              onClick={onClick}
              leftIcon={<IoCreateOutline />}
            >
              Create Post
            </Button>
            {user && (
              <Button
                variant="outline"
                height="30px"
                onClick={() => setOpen(true)}
                leftIcon={<AiOutlineTeam />}
              >
                Create Community
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};
export default PersonalHome;
