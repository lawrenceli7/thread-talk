import useDirectory from "@/hooks/useDirectory";
import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      fontSize="10pt"
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
      className="dark:bg-[#0f1113] dark:hover:bg-[#2a3236] w-full hover:bg-gray-100"
    >
      <Flex className="dark:text-white flex items-center">
        {imageURL ? (
          <Image
            src={imageURL}
            boxSize="18px"
            alt="Image"
            className="rounded-full mr-2"
          />
        ) : (
          <Icon as={icon} color={iconColor} className="text-xl mr-2" />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
