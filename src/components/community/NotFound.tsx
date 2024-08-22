import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      minHeight="60vh"
      className="dark:text-white flex flex-col justify-center items-center"
    >
      Sorry, that community does not exist or has been banned.
      <Link href="/">
        <Button className="mt-4">GO HOME</Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
