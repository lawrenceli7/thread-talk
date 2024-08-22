import { Post } from "@/atoms/postsAtom";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { BsChat, BsDot } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { FaSquareThreads } from "react-icons/fa6";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const singlePostPage = !onSelectPost;
  const [error, setError] = useState(false);

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);

    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer "}
      onClick={() => onSelectPost && onSelectPost(post)}
      className="dark:bg-black dark:border dark:border-black border bg-white"
    >
      <Flex
        bg={singlePostPage ? "none" : "gray.100"}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
        className="dark:bg-[#2a3236] flex flex-col items-center p-2"
      >
        <Icon
          as={userVoteValue === 1 ? BiSolidLike : BiLike}
          color={userVoteValue === 1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, 1, post.communityId)}
          className="dark:text-white cursor-pointer"
        />
        <Text fontSize="9pt" className="dark:text-white">
          {post.voteStatus}
        </Text>
        <Icon
          as={userVoteValue === -1 ? BiSolidDislike : BiDislike}
          color={userVoteValue === -1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={(event) => onVote(event, post, -1, post.communityId)}
          className="dark:text-white cursor-pointer"
        />
      </Flex>
      <Flex className="flex flex-col w-full">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text className="dark:text-white mr-2">{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} className="p-3">
          <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
            {homePage && (
              <div className="flex items-center">
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    boxSize="18px"
                    alt="Image"
                    className="rounded-full mr-2"
                  />
                ) : (
                  <Icon
                    as={FaSquareThreads}
                    fontSize="18pt"
                    className="mr-1 dark:text-blue-500"
                  />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    onClick={(event) => event.stopPropagation()}
                    className="dark:text-white font-bold hover:underline"
                  >{`thread/${post.communityId}`}</Text>
                </Link>
                <Icon
                  as={BsDot}
                  fontSize={8}
                  className="dark:text-white text-gray-500"
                />
              </div>
            )}
            <Text className="dark:text-white">
              Posted by user/{post.creatorDisplayName}
            </Text>
            <Spacer />
            <Icon as={CiTimer} className="dark:text-gray-200 mr-1" />
            <Text className="dark:text-gray-200">
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" className="dark:text-gray-300 font-semibold">
            {post.title}
          </Text>
          <Text fontSize="10pt" className="dark:text-white">
            {post.body}
          </Text>
          {post.imageURL && (
            <Flex className="flex justify-center items-center p-2">
              {loadingImage && (
                <Skeleton height="200px" className="w-full rounded" />
              )}
              <Image
                src={post.imageURL}
                maxHeight="460px"
                alt="Post Image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex className="ml-1 mb-0.5 text-gray-500">
          <Flex
            p="8px 10px"
            className="dark:hover:bg-[#2a3236] flex items-center rounded hover:bg-gray-200 cursor-pointer"
          >
            <Icon as={BsChat} className="dark:text-white mr-2" />
            <Text fontSize="9pt" className="dark:text-white">
              {post.numberOfComments}
            </Text>
          </Flex>
          {userIsCreator && (
            <Flex
              p="8px 10px"
              onClick={handleDelete}
              className="dark:hover:bg-[#2a3236] flex items-center rounded hover:bg-gray-200 cursor-pointer"
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <div className="flex items-center">
                  <Icon as={AiOutlineDelete} className="dark:text-white mr-2" />
                  <Text fontSize="9pt" className="dark:text-white">
                    Delete
                  </Text>
                </div>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
