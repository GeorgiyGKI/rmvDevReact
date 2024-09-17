import { useActiveIdContext } from "../lib/hooks/useActiveIdContext";
import { JobItem } from "../lib/types/JobItem";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
}

export function JobList({ jobItems, isLoading }: JobListProps) {
  const { activeId } = useActiveIdContext();

  return <ul className="job-list">
    {isLoading && <Spinner />}

    { !isLoading &&
      jobItems.map((jobItem) => (
        <JobListItem
          key={jobItem.id}
          jobItem={jobItem}
          isActive={
            jobItem.id === activeId
          }
        />
      ))
    }
  </ul>;
}

export default JobList;
