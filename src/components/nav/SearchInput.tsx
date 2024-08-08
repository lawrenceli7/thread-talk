import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";

type SearchInputProps = {
  user?: User | null;
};

const MotionFlex = motion(Flex);

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <MotionFlex
      flexGrow={1}
      mr={2}
      align="center"
      maxWidth={user ? "auto" : "600px"}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" mb={1} />
        </InputLeftElement>
        <Input
          placeholder="Search Threads"
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
          height="34px"
          bg="gray.50"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </InputGroup>
    </MotionFlex>
  );
};

export default SearchInput;
