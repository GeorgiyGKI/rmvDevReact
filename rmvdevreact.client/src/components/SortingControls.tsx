import { ReactNode } from "react";
import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

type SortingButtonProps = {
  children: ReactNode;
  onClick: (MouseEvent: React.MouseEvent<HTMLButtonElement>) => void;
  isActive: boolean;
}

export default function Sorting() {
  const { sortBy, handleChangeSortBy: onClick } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => onClick("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}


export function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--relevant ${isActive && 'sorting__button--active'}`}
    >
      {children}
    </button>
  );
}
