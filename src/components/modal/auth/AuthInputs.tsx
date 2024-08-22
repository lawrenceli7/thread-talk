import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <Flex className="flex flex-col items-center w-full mt-4">
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </Flex>
  );
};
export default AuthInputs;
