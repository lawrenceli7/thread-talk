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
      padding="6px 12px"
      justify={{ md: "space-between" }}
      className="dark:bg-[#0f1113] dark:border-b bg-white h-11"
    >
      <Flex
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        className="flex items-center cursor-pointer"
      >
        <Image src="/images/logo.svg" alt="Image" className="h-30" />
        <Image
          src="/images/logo-text.png"
          display={{ base: "none", md: "unset" }}
          alt="Image"
          className="h-30"
        />
        <Image
          src="/images/logo-text.jpg"
          display={{ base: "none", md: "unset" }}
          alt="Image"
          className="h-30"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
