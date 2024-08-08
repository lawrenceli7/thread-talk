import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchInput from "./SearchInput";
import RightContent from "./content";
import Directory from "./directory";

const Nav: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
      bg="white"
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor="pointer"
      >
        <Image src="/images/logo.svg" alt="Logo" height="30px" />
        <Image
          src="/images/logo-text.png"
          alt="Logo Text"
          height="25px"
          display={{ base: "none", md: "unset" }}
        />
        <Image
          src="/images/logo-text.jpg"
          alt="Logo Text"
          height="25px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Nav;
