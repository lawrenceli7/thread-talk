import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, isUser, isLoading, isError] =
    useSignInWithGithub(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  useEffect(() => {
    if (isUser) {
      createUserDocument(isUser.user);
    }
  }, [isUser]);

  return (
    <Flex className="flex flex-col w-full mb-4">
      <Button
        variant="oauth"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
        className="dark:bg-white mb-2"
      >
        <Image src="/images/google.png" alt="Image" className="mr-4 h-5" />
        Continue with Google
      </Button>
      <Button
        variant="oauth"
        isLoading={isLoading}
        onClick={() => signInWithGithub()}
        className="dark:bg-white"
      >
        <Image src="/images/github.png" alt="Image" className="mr-4 h-5" />
        Continue with Github
      </Button>
      {error && <Text>{error.message}</Text>}
      {isError && <Text>{isError.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
