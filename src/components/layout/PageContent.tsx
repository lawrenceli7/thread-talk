import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageContentProps = {
  children: ReactNode[];
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex p="16px 0px" className="dark:bg-[#0f1113] flex justify-center">
      <Flex width="95%" justify="center" maxWidth="860px">
        <Flex
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
          className="flex flex-col"
        >
          {children && children[0]}
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          className="flex flex-col flex-grow"
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
