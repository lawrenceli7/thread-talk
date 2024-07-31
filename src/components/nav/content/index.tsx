import React from "react";
import { Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      {/* <AutoModal /> */}
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
