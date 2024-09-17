import { useQueries } from "@tanstack/react-query";
import { BASE_API_URL } from "../constants";
import { JobItemExpanded } from "../types/JobItemExpanded";

type JobItemApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItem: JobItemExpanded;
}
const fetchJobItem = async (id: number | null): Promise<JobItemApiResponse> => {
  if (!id) throw new Error('Invalid ID');
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map(id => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id)
    })),
  });

  const jobItems = results
    .map(result => result.data?.jobItem)
    .filter(jobItem => jobItem !== undefined) as JobItemExpanded[];
  const isLoading = results.some((result) => result.isLoading);

  return {
    jobItems,
    isLoading
  }
}