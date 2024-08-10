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
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="/images/google.png" height="20px" mr={4} alt="Image" />
        Continue with Google
      </Button>
      <Button
        variant="oauth"
        isLoading={isLoading}
        onClick={() => signInWithGithub()}
      >
        <Image src="/images/github.png" height="20px" mr={4} alt="Image" />
        Continue with Github
      </Button>
      {error && <Text>{error.message}</Text>}
      {isError && <Text>{isError.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
