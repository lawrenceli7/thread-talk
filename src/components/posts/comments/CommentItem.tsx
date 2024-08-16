import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CiTimer } from "react-icons/ci";
import { GrDislike, GrLike } from "react-icons/gr";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Avatar
          icon={<AiOutlineUser fontSize={30} color="gray.300" />}
          size="sm"
        />
      </Box>
      <Stack spacing={1}>
        <Stack
          direction="row"
          align="center"
          fontSize="8pt"
          justify="space-between"
        >
          <Text fontWeight={700} className="dark:text-white">
            {comment.creatorDisplayText}
          </Text>
          <Spacer />
          <Icon as={CiTimer} className="dark:text-gray-200" />
          <Text color="gray.600" className="dark:text-gray-200">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt" className="dark:text-gray-300">
          {comment.text}
        </Text>
        <Stack direction="row" align="center" cursor="pointer" color="gray.500">
          <Icon as={GrLike} className="dark:text-white" />
          <Icon as={GrDislike} className="dark:text-white" />
          {userId === comment.creatorId && (
            <div className="flex gap-2">
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                className="dark:text-white"
              >
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => onDeleteComment(comment)}
                className="dark:text-white"
              >
                Delete
              </Text>
            </div>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
