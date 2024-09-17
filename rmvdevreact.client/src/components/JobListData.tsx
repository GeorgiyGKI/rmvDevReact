import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";
import JobList from "./JobList";

export default function JobListData() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext()

  return (
    <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
  );
}

