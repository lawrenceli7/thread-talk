import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
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
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
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
          onChange={onChange}
          fontSize="10pt"
          className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] mb-2 bg-gray-50 hover:bg-white hover:border hover:border-blue-500 placeholder:text-gray-500 focus:outline-none focus:border focus:border-blue-500"
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaLock} color="gray.500" />
        </InputLeftElement>
        <Input
          required
          name="password"
          onChange={onChange}
          placeholder="Password"
          type="password"
          fontSize="10pt"
          className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] mb-2 bg-gray-50 hover:bg-white hover:border hover:border-blue-500 placeholder:text-gray-500 focus:outline-none focus:border focus:border-blue-500"
        />
      </InputGroup>
      <Text fontSize="10pt" className="text-center text-red-500">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        type="submit"
        isLoading={loading}
        leftIcon={<FaSignInAlt />}
        className="w-full mt-2 mb-2 h-9"
      >
        Log In
      </Button>
      <Flex className="flex justify-center mb-2">
        <Text fontSize="9pt" className="dark:text-white mr-1">
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
          className="text-blue-500 cursor-pointer"
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" className="flex justify-center">
        <Text className="dark:text-white mr-1">New here?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
          className="font-bold cursor-pointer text-blue-500"
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
