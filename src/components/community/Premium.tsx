import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { useSetRecoilState } from "recoil";

const Premium: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Flex className="dark:bg-black flex flex-col bg-white rounded cursor-pointer border border-gray-300">
      <Flex
        p="6px 10px"
        className="dark:bg-[#2a3236] flex items-end text-white bg-blue-500 font-semibold rounded-sm h-34"
      ></Flex>
      <Flex className="flex flex-col p-6">
        <Flex className="mb-2">
          <Icon as={FaCrown} fontSize={26} color="gold" className="mt-2" />
          <Stack spacing={1} fontSize="9pt" className="pl-2">
            <Text className="dark:text-white font-semibold">ThreadTalk</Text>
            <Text className="dark:text-white">The best thread experience.</Text>
          </Stack>
        </Flex>
        <Button
          onClick={() => setAuthModalState({ open: true, view: "login" })}
          leftIcon={<GiAchievement />}
          className="h-30"
        >
          Try Now!
        </Button>
      </Flex>
    </Flex>
  );
};
export default Premium;
