import CreateCommunityModal from "@/components/modal/community";
import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

const Icons: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          borderRight="1px solid"
          borderColor="gray.200"
        ></Flex>
        <div>
          <Flex
            display={{ base: "none", md: "flex" }}
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            className="dark:bg-[#2a3236] hover:dark:bg-blue-500"
          >
            <Icon
              as={GrAdd}
              fontSize={20}
              onClick={() => setOpen(true)}
              className="dark:text-white"
            />
          </Flex>
        </div>
      </Flex>
    </div>
  );
};
export default Icons;
