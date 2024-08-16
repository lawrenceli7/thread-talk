import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { useSetRecoilState } from "recoil";

const Premium: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      className="dark:bg-black"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        className="dark:bg-[#2a3236]"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex mb={2}>
          <Icon as={FaCrown} fontSize={26} color="gold" mt={2} />
          <Stack spacing={1} fontSize="9pt" pl={2}>
            <Text fontWeight={600} className="dark:text-white">
              ThreadTalk
            </Text>
            <Text className="dark:text-white">The best thread experience.</Text>
          </Stack>
        </Flex>
        <Button
          height="30px"
          onClick={() => setAuthModalState({ open: true, view: "login" })}
          leftIcon={<GiAchievement />}
        >
          Try Now!
        </Button>
      </Flex>
    </Flex>
  );
};
export default Premium;
