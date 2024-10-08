import { Button, Divider, Flex, Text, Textarea } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import AuthButtons from "../../nav/content/AuthButtons";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  user: User;
  createLoading: boolean;
  onCreateComment: (commentText: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment,
}) => {
  return (
    <div>
      <Divider className="mb-2" />
      <Flex className="flex flex-col relative">
        {user ? (
          <div>
            <Text className="dark:text-white mb-1">
              Commenting as{" "}
              <span className="text-[#3182ce]">
                {user?.email?.split("@")[0]}
              </span>
            </Text>
            <Textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="What are your thoughts?"
              fontSize="10pt"
              minHeight="160px"
              className="dark:bg-[#2a3236] dark:hover:bg-[#2a3236] dark:text-white rounded pb-10 placeholder:text-gray-500 focus:outline-none focus:border focus:border-black"
            />
            <Flex
              right={0.1}
              p="6px 8px"
              className="dark:bg-gray-600 absolute flex justify-end bg-gray-100 left-px bottom-px rounded-b"
            >
              <Button
                disabled={!commentText.length}
                isLoading={createLoading}
                onClick={() => onCreateComment(commentText)}
                rightIcon={<HiOutlinePaperAirplane />}
                className="h-26"
              >
                Comment
              </Button>
            </Flex>
          </div>
        ) : (
          <Flex className="flex items-center justify-between rounded-md border border-gray-100 p-4 mt-4">
            <Text className="dark:text-white font-semibold">
              Log in or sign up to leave a comment
            </Text>
            <AuthButtons />
          </Flex>
        )}
      </Flex>
    </div>
  );
};
export default CommentInput;
