import { Community, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { FaUserCog, FaUsers } from "react-icons/fa";
import { FaRegPenToSquare, FaSquareThreads } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoCreateOutline } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, onSelectFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);

    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);

      await uploadString(imageRef, selectedFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      console.log("onUpdateImage error", error);
      console.error(error.message);
      toast.error(error.message);
    }
    setUploadingImage(false);
  };

  return (
    <Box className="dark:border rounded-md sticky top-3.5">
      <Flex className="flex justify-between items-center bg-blue-400 text-white p-3 rounded">
        <Text fontSize="10pt" className="font-bold">
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex className="dark:bg-black flex flex-col p-3 bg-white rounded">
        <Stack>
          <Flex fontSize="10pt" className="font-bold w-full p-2">
            <Flex className="flex flex-col flex-grow">
              <Text className="dark:text-white">
                {communityData.numberOfMembers.toLocaleString()}
              </Text>
              <Flex className="flex items-center">
                <Text className="dark:text-white mr-1">Members</Text>
                <Icon as={FaUsers} className="dark:text-white" />
              </Flex>
            </Flex>
            <Flex className="flex flex-col flex-grow">
              <Text className="dark:text-white">N/A</Text>
              <Flex className="flex items-center">
                <Text className="dark:text-white mr-1">Online</Text>
                <Icon as={GoDotFill} color="green" />
              </Flex>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            fontSize="10pt"
            className="font-medium flex items-center w-full p-1"
          >
            <Icon
              as={IoCreateOutline}
              className="dark:text-white mr-2 text-lg"
            />
            {communityData.createdAt && (
              <Text className="dark:text-white">
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button leftIcon={<FaRegPenToSquare />} className="h-1 w-full mt-3">
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <div>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Flex className="flex items-center mt-1">
                  <Text className="dark:text-white font-semibold mr-1">
                    Admin
                  </Text>
                  <Icon as={FaUserCog} className="dark:text-white text-base" />
                </Flex>
                <Flex className="flex items-center justify-between">
                  <Flex className="flex items-center">
                    <Text
                      onClick={() => selectedFileRef.current?.click()}
                      className="mr-1 hover:underline cursor-pointer text-blue-500"
                    >
                      Change Image
                    </Text>
                    <Icon
                      as={CiImageOn}
                      color="blue.500"
                      className="text-base"
                    />
                  </Flex>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.imageURL}
                      boxSize="40px"
                      alt="Community Image"
                      className="rounded-full"
                    />
                  ) : (
                    <Icon
                      as={FaSquareThreads}
                      fontSize={40}
                      color="blue.500"
                      className="mr-2"
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Flex className="flex items-center">
                      <Text
                        onClick={onUpdateImage}
                        className="cursor-pointer mr-1"
                      >
                        Save Changes
                      </Text>
                      <Icon as={MdCheck} />
                    </Flex>
                  ))}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                />
              </Stack>
            </div>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
