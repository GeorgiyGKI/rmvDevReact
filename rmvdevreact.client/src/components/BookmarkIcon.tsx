import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";

type BookmarkIconProps = {
  id: number;
}
export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookMarkedIds, handleTongleBookmark } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        handleTongleBookmark(id)
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn">
      <BookmarkFilledIcon className={`
      ${bookMarkedIds.includes(id) ? "filled" : ""} 
      `} />
    </button>
  );
}
