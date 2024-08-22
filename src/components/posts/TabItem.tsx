import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type TabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItems: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      p="14px 0px"
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      onClick={() => setSelectedTab(item.title)}
      className="dark:hover:bg-[#2a3236] dark:text-white flex justify-center items-center flex-grow cursor-pointer font-bold hover:bg-gray-50 border-r-gray-200"
    >
      <Flex className="flex items-center mr-2 h-5">
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
export default TabItems;
