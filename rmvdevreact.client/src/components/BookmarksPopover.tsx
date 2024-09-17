import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks/useBookmarksContext";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookMarkedJobItems, isLoading } = useBookmarksContext();

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookMarkedJobItems} isLoading={isLoading}></JobList>
    </div>,
    document.body
  );
});

export default BookmarksPopover;