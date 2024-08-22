import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot } from "react-icons/bs";
import { FaEnvelope, FaSquareThreads } from "react-icons/fa6";
import { useSetRecoilState } from "recoil";

const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };
  return (
    <Flex className="flex flex-col items-center w-full">
      <Icon
        as={FaSquareThreads}
        color="brand.100"
        fontSize={40}
        className="mb-2"
      />
      <Text className="dark:text-white font-bold mb-2">
        Reset your password
      </Text>
      {success ? (
        <Text className="mb04">Check your email.</Text>
      ) : (
        <div>
          <Text fontSize="sm" className="dark:text-white text-center mb-2">
            {`Enter the email associated with your account and we'll send you a
            reset link.`}
          </Text>
          <form onSubmit={onSubmit} className="w-full">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} color="gray.500" />
              </InputLeftElement>
              <Input
                required
                name="email"
                placeholder="Email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                _focus={{
                  outline: "none",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] mb-2 bg-gray-50"
              />
            </InputGroup>
            <Text fontSize="10pt" className="text-center text-red-500">
              {error?.message}
            </Text>
            <Button
              height="36px"
              type="submit"
              isLoading={sending}
              className="w-full mb-2 mt-2"
            >
              Reset Password
            </Button>
          </form>
        </div>
      )}
      <Flex
        fontSize="9pt"
        className="flex items-center text-blue-500 font-bold cursor-pointer"
      >
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
