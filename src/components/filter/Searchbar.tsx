import classes from "./Searchbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "@/store/filter-slice";
import { RootState } from "@/store";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Searchbar = () => {
  const dispatch = useDispatch();
  const searchbar = useSelector((state: RootState) => state.filter.searchbar);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setSearchbar(event.target.value));
  };

  return (
    <div className={classes.searchbar}>
      <input
        type="text"
        id="search"
        value={searchbar}
        className={inter.className}
        onChange={inputChangeHandler}
        placeholder="Search Cocktail"
      />
    </div>
  );
};

export default Searchbar;
