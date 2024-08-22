import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./content";
import Directory from "./directory";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
      className="dark:bg-[#0f1113] dark:border-b bg-white"
    >
      <Flex
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        className="flex items-center cursor-pointer"
      >
        <Image src="/images/logo.svg" height="30px" alt="Image" />
        <Image
          src="/images/logo-text.png"
          height="30px"
          display={{ base: "none", md: "unset" }}
          alt="Image"
        />
        <Image
          src="/images/logo-text.jpg"
          height="30px"
          display={{ base: "none", md: "unset" }}
          alt="Image"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
