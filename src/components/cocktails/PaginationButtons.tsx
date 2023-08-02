import classes from "./PaginationButtons.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface PaginationButtonsProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = (props) => {
  const { currentPage, setCurrentPage, totalPages } = props;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={classes.pagination}>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={inter.className}
      >
        Previous
      </button>
      <p className={inter.className}>
        <span>{currentPage}</span>
        <span className={classes.total}> / {totalPages}</span>
      </p>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={inter.className}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
