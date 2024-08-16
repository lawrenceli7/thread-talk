import { communityState } from "@/atoms/communitiesAtom";
import {
  defaultMenuItem,
  DirectoryMenuItem,
  directoryMenuState,
} from "@/atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaSquareThreads } from "react-icons/fa6";
import { useRecoilState } from "recoil";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(directoryMenuState);
  const router = useRouter();
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `thread/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaSquareThreads,
          iconColor: "blue.500",
        },
      }));
      return;
    }
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityStateValue.currentCommunity]);

  useEffect(() => {
    const { communityId } = router.query;

    if (!communityId) {
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: undefined,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
