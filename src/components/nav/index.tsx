import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SearchInput from "./SearchInput";
import RightContent from "./content";
import Directory from "./directory";

const MotionFlex = motion(Flex);

const Nav: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <MotionFlex
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
      bg="white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MotionFlex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor="pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
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
      </MotionFlex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </MotionFlex>
  );
};

export default Nav;
