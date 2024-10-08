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
          fontSize="10pt"
          className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] mb-2 bg-gray-50 hover:bg-white hover:border hover:border-blue-500 placeholder:text-gray-500 focus:outline-none focus:border focus:border-blue-500"
        />
      </InputGroup>
      <Text fontSize="10pt" className="text-center text-red-500">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        type="submit"
        isLoading={loading}
        leftIcon={<FaSignInAlt />}
        className="w-full mt-2 mb-2 h-9"
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" className="flex justify-center">
        <Text className="dark:text-white mr-1">Already a user?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
          className="text-blue-500 font-bold cursor-pointer"
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
