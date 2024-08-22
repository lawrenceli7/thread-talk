import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import React from "react";
import { LuUserCheck2, LuUserX2 } from "react-icons/lu";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <div className="flex">
      <Button
        variant="outline"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "80px", md: "110px" }}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
        leftIcon={<LuUserCheck2 />}
        className="mr-2 h-7"
      >
        Log In
      </Button>
      <Button
        display={{ base: "none", sm: "flex" }}
        width={{ base: "80px", md: "110px" }}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
        leftIcon={<LuUserX2 />}
        className="mr-2 h-7"
      >
        Sign Up
      </Button>
    </div>
  );
};
export default AuthButtons;
