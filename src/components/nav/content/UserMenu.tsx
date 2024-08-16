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
        cursor="pointer"
        padding="2px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        className="dark:bg-[#2a3236] hover:dark:bg-blue-500"
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <div className="flex">
                <Avatar fontSize={24} mr={1} color="gray.300" size="xs" />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700} className="dark:text-white">
                    {user?.displayName || user.email?.split("@")[0]}
                  </Text>
                  <Flex>
                    <Text color="gray.400" className="dark:text-white">
                      user
                    </Text>
                  </Flex>
                </Flex>
              </div>
            ) : (
              <Avatar fontSize={24} color="gray.400" mr={1} size="xs" />
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
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              className="dark:bg-[#181c1f]"
            >
              <Flex align="center" className="dark:text-white">
                <Icon fontSize={20} mr={2} as={FaRegUserCircle} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              className="dark:bg-[#181c1f]"
              onClick={handleThemeSwitch}
            >
              <Flex align="center" className="dark:text-white">
                <Icon
                  fontSize={20}
                  mr={2}
                  as={theme === "dark" ? LuMoon : LuSun}
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
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              className="dark:bg-[#181c1f]"
              onClick={logout}
            >
              <Flex align="center" className="dark:text-white">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              className="dark:bg-[#181c1f]"
              onClick={handleThemeSwitch}
            >
              <Flex align="center" className="dark:text-white">
                <Icon
                  fontSize={20}
                  mr={2}
                  as={theme === "dark" ? LuMoon : LuSun}
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
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              className="dark:bg-[#181c1f]"
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center" className="dark:text-white">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
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
