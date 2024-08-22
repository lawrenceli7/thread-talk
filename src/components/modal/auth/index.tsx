import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [user] = useAuthState(auth);
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="dark:bg-[#181c1f]">
        <ModalHeader className="dark:text-white text-center">
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col justify-center items-center pb-6">
          <Flex className="flex flex-col items-center justify-center w-70%">
            {modalState.view === "login" || modalState.view === "signup" ? (
              <>
                <OAuthButtons />
                <Text className="font-bold text-gray-500">OR</Text>
                <AuthInputs />
              </>
            ) : (
              <ResetPassword />
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
