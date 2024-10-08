import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthModal from "../../modal/auth";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <div className="flex">
      <AuthModal />
      <Flex className="flex justify-center items-center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </div>
  );
};
export default RightContent;
