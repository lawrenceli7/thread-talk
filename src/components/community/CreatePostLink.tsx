import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

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
    <Flex className="dark:bg-black flex items-center justify-evenly bg-white p-2 mb-4 rounded border border-gray-300 h-14">
      <Icon
        as={FaRegPenToSquare}
        color="gray.300"
        className="mr-4 text-4xl text-gray-300"
      />
      <Input
        placeholder="Create Post..."
        fontSize="10pt"
        onClick={onClick}
        className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] mr-4 bg-gray-50 rounded border-gray-200 hover:bg-white hover:border hover:border-blue-500 focus:outline-none focus:border focus:border-blue-500 h-9 placeholder:text-gray-500"
      />
      <Icon
        as={IoImageOutline}
        color="gray.400"
        className="cursor-pointer mr-4 text-2xl"
      />
      <Icon
        as={BsLink45Deg}
        color="gray.400"
        className="text-2xl cursor-pointer"
      />
    </Flex>
  );
};
export default CreatePostLink;
