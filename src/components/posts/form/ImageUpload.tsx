import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedTab,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex className="flex flex-col justify-center items-center w-full">
      {selectedFile ? (
        <div className="flex flex-col items-center">
          <Image
            src={selectedFile}
            alt="Image"
            className="max-w-400 max-h-400"
          />
          <Stack direction="row" className="mt-4">
            <Button onClick={() => setSelectedTab("Post")} className="h-7">
              Back to Post
            </Button>
            <Button
              variant="outline"
              onClick={() => setSelectedFile("")}
              className="h-7"
            >
              Remove
            </Button>
          </Stack>
        </div>
      ) : (
        <Flex className="dark:bg-[#2a3236] flex justify-center items-center p-20 border-dashed border-gray-200 w-full rounded">
          <Button
            variant="outline"
            onClick={() => selectedFileRef.current?.click()}
            className="h-7"
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectImage}
          />
          <Image src={selectedFile} alt="Image" />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
