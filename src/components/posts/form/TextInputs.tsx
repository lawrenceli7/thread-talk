import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} className="w-full">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        placeholder="Title"
        className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] dark:text-white rounded placeholder:text-gray-500 focus:outline-none focus:border focus:border-black"
      />
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        placeholder="Text (optional)"
        className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] dark:text-white rounded placeholder:text-gray-500 h-100 focus:outline-none focus:border focus:border-black"
      />
      <Flex className="flex justify-end">
        <Button
          padding="0px 30px"
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
          className="h-34"
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
