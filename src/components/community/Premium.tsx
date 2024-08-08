import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";

const Premium: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex mb={2}>
        <Icon as={FaCrown} fontSize={26} color="gold" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>ThreadTalk Premium</Text>
          <Text>The best ThreadTalk experience.</Text>
        </Stack>
      </Flex>
      <Button
        leftIcon={<Icon as={GiAchievement} />}
        height="30px"
        bg="gold"
        color="white"
      >
        Go Premium
      </Button>
    </Flex>
  );
};

export default Premium;
