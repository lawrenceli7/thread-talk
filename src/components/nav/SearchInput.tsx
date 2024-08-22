import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex
      maxWidth={user ? "auto" : "600px"}
      className="flex flex-grow mr-2 items-center"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon className="dark:text-white text-gray-400 mb-1" />
        </InputLeftElement>
        <Input
          placeholder="Search Threads..."
          fontSize="10pt"
          _placeholder={{ color: "gray.400" }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          className="dark:bg-[#2a3236] dark:hover:bg-gray-700 dark:text-white bg-gray-50 hover:bg-white hover:border hover:border-blue-500"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
