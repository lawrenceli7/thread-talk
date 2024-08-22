import useDirectory from "@/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        padding="0px 6px"
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
        className="dark:bg-[#2a3236] dark:hover:bg-blue-500 cursor-pointer rounded mr-2"
      >
        <Flex
          width={{ base: "auto", lg: "200px" }}
          className="flex items-center justify-between"
        >
          <Flex className="flex items-center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                boxSize="24px"
                alt="Image"
                className="rounded-full mr-2"
              />
            ) : (
              <Icon
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
                className="dark:text-white text-2xl"
              />
            )}
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontSize="10pt" className="dark:text-white font-semibold">
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList className="dark:bg-[#0f1113]">
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
