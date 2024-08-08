import { authModalState } from "@/atoms/authModalAtom";
import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { LuUserCheck2, LuUserX2 } from "react-icons/lu";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "85px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
        leftIcon={<Icon as={LuUserCheck2} />}
      >
        Log In
      </Button>
      <Button
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "85px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
        leftIcon={<Icon as={LuUserX2} />}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
