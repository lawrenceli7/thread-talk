import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { useTheme } from "@/hooks/useTheme";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuMoon, LuSun } from "react-icons/lu";
import { MdOutlineLogin } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { theme, handleThemeSwitch } = useTheme();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        padding="2px 6px"
        className="dark:bg-[#2a3236] hover:dark:bg-blue-500 cursor-pointer rounded hover:outline hover:outline-gray-200"
      >
        <Flex className="flex items-center">
          <Flex className="flex items-center">
            {user ? (
              <div className="flex">
                <Avatar size="sm" className="mr-1 text-gray-300 text-2xl" />
                <Flex
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  className="flex flex-col items-start mr-8"
                >
                  <Text className="dark:text-white font-bold">
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Text className="dark:text-white text-gray-400">user</Text>
                  </Flex>
                </Flex>
              </div>
            ) : (
              <Avatar size="sm" className="mr-1 text-gray-400 text-2xl" />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList className="dark:bg-[#181c1f]">
        {user ? (
          <div>
            <MenuItem
              fontSize="10pt"
              className="dark:bg-[#181c1f] font-bold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500"
            >
              <Flex className="dark:text-white flex items-center">
                <Icon as={FaRegUserCircle} className="mr-2 text-xl" />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              onClick={handleThemeSwitch}
              className="dark:bg-[#181c1f] font-bold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500"
            >
              <Flex className="dark:text-white flex items-center">
                <Icon
                  as={theme === "dark" ? LuMoon : LuSun}
                  className="text-xl mr-2"
                />
                {theme === "dark" ? (
                  <Text>Dark Mode: On</Text>
                ) : (
                  <Text>Light Mode: On</Text>
                )}
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              onClick={logout}
              className="dark:bg-[#181c1f] font-bold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500"
            >
              <Flex className="dark:text-white flex items-center">
                <Icon as={MdOutlineLogin} className="text-xl mr-2" />
                Log Out
              </Flex>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              fontSize="10pt"
              className="dark:bg-[#181c1f] font-bold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500"
              onClick={handleThemeSwitch}
            >
              <Flex className="dark:text-white flex items-center">
                <Icon
                  as={theme === "dark" ? LuMoon : LuSun}
                  className="mr-2 text-xl"
                />
                {theme === "dark" ? (
                  <Text>Dark Mode: On</Text>
                ) : (
                  <Text>Light Mode: On</Text>
                )}
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              className="dark:bg-[#181c1f] font-bold hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500"
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex className="dark:text-white flex items-center">
                <Icon as={MdOutlineLogin} className="text-xl mr-2" />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </div>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
