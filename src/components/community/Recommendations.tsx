import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";

const Recommendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);

    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );

      const communityDocs = await getDocs(communityQuery);

      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCommunities(communities as Community[]);
    } catch (error: any) {
      console.log("getCommunityRecommendations error", error);
      console.log(error.message);
      toast.loading(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex className="dark:bg-black flex flex-col bg-white rounded border border-gray-300">
      <Flex
        p="6px 10px"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        className="dark:bg-[#2a3236] dark:border flex items-end text-white font-semibold bg-blue-500"
      >
        Top Communities
      </Flex>
      <Flex className="flex flex-col">
        {loading ? (
          <Stack className="mt-2 p-3">
            <Flex className="flex justify-between items-center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex className="flex justify-between items-center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex className="flex justify-between items-center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <div>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === item.id
              );
              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex
                    fontSize="10pt"
                    p="10px 12px"
                    className="flex relative items-center border-b border-gray-200"
                  >
                    <Flex width="80%" className="flex items-center">
                      <Flex width="15%">
                        <Text className="dark:text-white">{index + 1}</Text>
                      </Flex>
                      <Flex width="80%" className="flex items-center">
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            boxSize="28px"
                            alt="Image"
                            className="rounded-full mr-2"
                          />
                        ) : (
                          <Icon
                            as={FaUserFriends}
                            fontSize={30}
                            color="blue.500"
                            className="mr-2"
                          />
                        )}
                        <span className="dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                          {`${item.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box className="absolute right-2.5">
                      <Button
                        height="22px"
                        fontSize="8pt"
                        variant={isJoined ? "outline" : "solid"}
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinOrLeaveCommunity(item, isJoined);
                        }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
          </div>
        )}
      </Flex>
    </Flex>
  );
};
export default Recommendations;
