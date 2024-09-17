import { BASE_API_URL } from "../constants";
import { JobItemExpanded } from "../types/JobItemExpanded";
import { useQuery } from "@tanstack/react-query";

//export function useJobItem(id: number | null) {
//  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//  const [isLoading, setIsLoading] = useState(false);

//  useEffect(() => {
//    if (!id) return;

//    const fetchData = async () => {
//      setIsLoading(true);
//
//      setIsLoading(false)
//      setJobItem(data.jobItem);
//    };

//    fetchData();
//  }, [id]);

//  return [jobItem, isLoading] as const;
//}

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

export function useJobItem(id: number | null) {
  const { data, isLoading } = useQuery({
    queryKey: ['job-item', id],
    queryFn: () => fetchJobItem(id),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id)
  });

  return {
    jobItem: data?.jobItem,
    isLoading
  } as const;
}