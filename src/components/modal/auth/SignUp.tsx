import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/clientApp";
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
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user: User) => {
    await setDoc(
      doc(firestore, "users", user.uid),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

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
          mb={2}
          onChange={onChange}
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
          mb={2}
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
      <InputGroup>
        <InputLeftElement>
          <Icon as={FaLock} color="gray.500" />
        </InputLeftElement>
        <Input
          required
          name="confirmPassword"
          onChange={onChange}
          placeholder="Confirm Password"
          type="password"
          mb={2}
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
      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
        leftIcon={<FaSignInAlt />}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1} className="dark:text-white">
          Already a user?
        </Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
