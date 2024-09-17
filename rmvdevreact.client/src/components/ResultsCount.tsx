import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

export default function ResultsCount() {
  const { totalNumberOfResults } = useJobItemsContext();

  return <p className="count"><b>{totalNumberOfResults}</b> results</p>;
}
