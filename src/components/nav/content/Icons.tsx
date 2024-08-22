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
          className="border-r border-gray-200"
        ></Flex>
        <div>
          <Flex
            display={{ base: "none", md: "flex" }}
            className="dark:bg-[#2a3236] hover:dark:bg-blue-500 hover:bg-gray-200 rounded cursor-pointer p-1 ml-1.5 mr-1.5"
          >
            <Icon
              as={GrAdd}
              onClick={() => setOpen(true)}
              className="dark:text-white text-xl"
            />
          </Flex>
        </div>
      </Flex>
    </div>
  );
};
export default Icons;
