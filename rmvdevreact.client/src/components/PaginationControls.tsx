import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../lib/hooks/useJobItemsContext";

type PaginationButtonProps = {
  direction: string;
  currentPage: number;
  onClick: () => void;
}

export default function PaginationControls() {
  const { currentPage, totalNumberOfPages, handleChangePage: onClick } = useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 &&
        (
          <PaginationButton
            direction="previous"
            currentPage={currentPage}
            onClick={() => onClick("previous")}
          />
        )}
      {currentPage < totalNumberOfPages &&
        (
          <PaginationButton
            direction="next"
            currentPage={currentPage}
            onClick={() => onClick("next")}
          />
        )}
    </section>
  );
}

export function PaginationButton({
  direction,
  currentPage,
  onClick
}: PaginationButtonProps) {
  return (
    <button
      onClick={e => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}>
      {
        direction === "previous" && (
          <>
            <ArrowLeftIcon />
            Page {currentPage - 1}
          </>
        )
      }
      {
        direction === "next" && (
          <>
            Page {currentPage + 1}
            <ArrowRightIcon />
          </>
        )
      }

    </button>
  );
}
