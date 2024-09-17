import { JobItem } from "../types/JobItem";
import { BASE_API_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

//export function useJobItems(searchText: string) {
//  const [jobItems, setJobItems] = useState<JobItem[]>([]);
//  const [isLoading, setIsLoading] = useState(false);

//  useEffect(() => {
//    if (!searchText) return;

//    const fetchData = async () => {
//      setIsLoading(true);
//      const response = await fetch(`${BASE_API_URL}/?search=${searchText}`);
//      const data = await response.json();
//      setIsLoading(false)
//      setJobItems(data.jobItems)
//    };

//    fetchData();
//  }, [searchText]);

//  return { jobItems, isLoading } as const;
//}

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
}

const fetchJobItems = async (searchText: string): Promise<JobItemsApiResponse | undefined> => {
    const response = await fetch(`${BASE_API_URL}/?search=${searchText}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }
    const data = await response.json();
    return data;
};
export function useSearchQuery(searchText: string) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['job-items', searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchText)
  });

  useEffect(() => {
    if (isError) {
      toast.error(`Error fetching job items: ${error.message}`);
    }
  }, [isError, error]);

  return {
    jobItems: data?.jobItems,
    isLoading
  };
};