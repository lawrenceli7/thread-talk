import { communityState } from "@/atoms/communitiesAtom";
import PageContent from "@/components/layout/PageContent";
import { auth } from "@/firebase/clientApp";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const communityStateValue = useRecoilState(communityState);
  const [loading, setLoading] = useState(false);

  const buildUserHomeFeed = () => {};

  const buildNoUserHomeFeed = () => {
    setLoading(true);

    try {
    } catch (error: any) {
      console.error("Error building no user home feed: ", error);
    }
    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) {
      buildNoUserHomeFeed();
    }
  }, [user, loadingUser]);

  return (
    <PageContent>
      <></>
      <></>
    </PageContent>
  );
}
