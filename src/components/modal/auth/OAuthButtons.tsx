import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/google.png"
          alt="Google Logo"
          height="20px"
          mr={4}
        />
        Continue with Google
      </Button>
      <Button variant="oauth">
        <Image
          src="/images/github.png"
          alt="Github Logo"
          height="20px"
          mr={4}
        />
        Continue with Github
      </Button>
      {error && (
        <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
          {error.toString()}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
