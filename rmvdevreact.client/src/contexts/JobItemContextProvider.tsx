import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery } from "../lib/hooks/useSearchQuery";
import { SortBy } from "../lib/types/SortBy";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { JobItem } from "../lib/types/JobItem";
import { useSearchTextContext } from "../lib/hooks/useSearchTextContext";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: 'next' | 'previous') => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
  const { debouncedSearchText } = useSearchTextContext();

  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant")



  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
  const jobItemsSorted = useMemo(() => [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    }
    else {
      return a.daysAgo - b.daysAgo;
    }
  }), [sortBy, jobItems]);
  const jobItemsSortedAndSliced = useMemo(() =>
    jobItemsSorted.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    ), [currentPage]);

  const handleChangePage = useCallback((direction: 'next' | 'previous') => {
    if (direction === "next") {
      setCurrentPage((prev: number) => prev + 1)
    }
    else if (direction === "previous") {
      setCurrentPage((prev: number) => prev - 1)
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(() => ({
    jobItems,
    jobItemsSortedAndSliced,
    isLoading,
    totalNumberOfPages,
    totalNumberOfResults,
    currentPage,
    sortBy,
    handleChangePage,
    handleChangeSortBy
  }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfPages,
      totalNumberOfResults,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy
    ]);

  return (
    <JobItemsContext.Provider
      value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}

