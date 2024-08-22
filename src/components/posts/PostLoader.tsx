import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import React from "react";

const PostLoader: React.FC = () => {
  return (
    <Stack spacing={6}>
      <Box
        padding="10px 10px"
        boxShadow="lg"
        className="dark:bg-black bg-white rounded"
      >
        <SkeletonText noOfLines={1} spacing="4" className="mt-4 w-2/5" />
        <SkeletonText noOfLines={4} spacing="4" className="mt-4" />
        <Skeleton className="mt-4 h-200" />
      </Box>
      <Box
        padding="10px 10px"
        boxShadow="lg"
        className="dark:bg-black bg-white rounded"
      >
        <SkeletonText noOfLines={1} spacing="4" className="mt-4 w-2/5" />
        <SkeletonText noOfLines={4} spacing="4" className="mt-4" />
        <Skeleton className="mt-4 h-200" />
      </Box>
    </Stack>
  );
};
export default PostLoader;
