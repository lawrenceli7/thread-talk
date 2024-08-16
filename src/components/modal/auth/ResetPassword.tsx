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
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={FaSquareThreads} color="brand.100" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2} className="dark:text-white">
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email.</Text>
      ) : (
        <div>
          <Text
            fontSize="sm"
            textAlign="center"
            mb={2}
            className="dark:text-white"
          >
            {`Enter the email associated with your account and we'll send you a
            reset link.`}
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} color="gray.500" />
              </InputLeftElement>
              <Input
                required
                name="email"
                placeholder="Email"
                type="email"
                mb={2}
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
                bg="gray.50"
                className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236]"
              />
            </InputGroup>
            <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text>
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </div>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
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
