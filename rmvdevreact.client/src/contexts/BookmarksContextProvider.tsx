import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks/useLocalStorage";
import { useJobItems } from "../lib/hooks/useJobItems";
import { JobItemExpanded } from "../lib/types/JobItemExpanded";

type BookmarksContext = {
  bookMarkedIds: number[];
  handleTongleBookmark: (id: number) => void;
  bookMarkedJobItems: JobItemExpanded[] ;
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
  const [bookMarkedIds, setBookMarkedIds] = useLocalStorage<number[]>("bookmarkedIds", []);
  const { jobItems: bookMarkedJobItems, isLoading } = useJobItems(bookMarkedIds);

  const handleTongleBookmark = (id: number) => {
    if (bookMarkedIds.includes(id)) {
      setBookMarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookMarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookMarkedIds,
        handleTongleBookmark,
        bookMarkedJobItems,
        isLoading
      }}>
      {children}
    </BookmarksContext.Provider>
  );
}

