import classes from "./PaginationButtons.module.css";
import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { uiActions } from "@/store/ui-slice";

const inter = Inter({ subsets: ["latin"] });

interface PaginationButtonsProps {
  // currentPage: number;
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = (props) => {
  // const { currentPage, setCurrentPage, totalPages } = props;
  const currentPage = useSelector((state: RootState) => state.ui.currentPage);
  const dispatch = useDispatch();

  const handlePreviousPage = () => {
    // setCurrentPage((prevPage) => prevPage - 1);
    dispatch(uiActions.decreaseCurrentPage());
  };

  const handleNextPage = () => {
    // setCurrentPage((prevPage) => prevPage + 1);
    dispatch(uiActions.increaseCurrentPage());
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
        <span className={classes.total}> / {props.totalPages}</span>
      </p>
      <button
        onClick={handleNextPage}
        disabled={currentPage === props.totalPages}
        className={inter.className}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
