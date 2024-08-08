import { authModalState } from "@/atoms/authModalAtom";
import { Button, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { LuUserCheck2, LuUserX2 } from "react-icons/lu";
import { useSetRecoilState } from "recoil";

const MotionButton = motion(Button);

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <MotionButton
        variant="outline"
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "85px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
        leftIcon={<Icon as={LuUserCheck2} />}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Log In
      </MotionButton>
      <MotionButton
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "85px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
        leftIcon={<Icon as={LuUserX2} />}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Sign Up
      </MotionButton>
    </>
  );
};
export default AuthButtons;
