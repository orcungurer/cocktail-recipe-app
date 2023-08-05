import classes from "./CocktailList.module.css";
import CocktailItem from "./CocktailItem";
import { CocktailsProps } from "@/models/cocktails";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import PaginationButtons from "./PaginationButtons";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const ITEMS_PER_PAGE = 10;

const CocktailList: React.FC<CocktailsProps> = (props) => {
  const router = useRouter();

  const searchbar = useSelector((state: RootState) => state.filter.searchbar);

  const selectedIngredients = useSelector(
    (state: RootState) => state.filter.selectedIngredients
  );
  // console.log(selectedIngredients);

  const currentPage = useSelector((state: RootState) => state.ui.currentPage);

  // we map through the cocktails and check if each cocktail's
  // ingredients are included in the selectedIngredients.
  // if an ingredient is found in selectedIngredients, we store matchingIngredientsAmount
  // then, we add the matchingIngredientsAmount property to each cocktail object.
  // next, we filter(render) the cocktails based on the following conditions:
  // - if no ingredients are selected, we render the cocktail.
  // - If at least one ingredient is selected, ->
  //   and the cocktail has at least one matching ingredient, we render.
  const filteredCocktails = props.cocktails
    .map((cocktail) => {
      const matchingIngredientsAmount = cocktail.ingredients.filter(
        (ingredient) => selectedIngredients.includes(ingredient.name)
      ).length;

      return {
        ...cocktail,
        matchingIngredientsAmount,
      };
    })
    .filter((cocktail) => {
      if (
        searchbar !== "" &&
        !cocktail.name.toLowerCase().includes(searchbar.toLowerCase())
      ) {
        return false;
      }
      if (
        searchbar !== "" &&
        cocktail.matchingIngredientsAmount > 0 &&
        cocktail.name.toLowerCase().includes(searchbar.toLowerCase())
      ) {
        return true;
      }
      if (
        selectedIngredients.length === 0 ||
        cocktail.matchingIngredientsAmount > 0
      ) {
        return true;
      }
      return false;
    });
  // console.log(filteredCocktails);

  // const [currentPage, setCurrentPage] = useState(1);
  const totalCocktails = filteredCocktails.length;
  const totalPages = Math.ceil(totalCocktails / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCocktails = filteredCocktails.slice(startIndex, endIndex);

  let cocktailAmountText: string | ReactNode = `${totalCocktails} cocktails`;

  if (totalCocktails === 0) {
    cocktailAmountText = (
      <p className={`${classes["suggest-cocktail"]} ${inter.className}`}>
        <span className={classes.title}>
          Hmmm, looks like a new cocktail! 🍹
        </span>
        <span className={classes.desc}>
          Wanna suggest adding it for others to enjoy?
        </span>
        <button type="button" onClick={() => router.push("/new-cocktail")}>
          Suggest Cocktail
        </button>
      </p>
    );
  }

  return (
    <div className={classes["cocktail-list"]}>
      <div className={`${classes["cocktail-amount"]} ${inter.className}`}>
        {cocktailAmountText}
      </div>
      <ul className={classes.list}>
        {currentCocktails.map((cocktail) => (
          <CocktailItem
            key={cocktail.id}
            id={cocktail.id}
            cocktailId={cocktail.cocktailId}
            name={cocktail.name}
            image={cocktail.image}
            ingredients={cocktail.ingredients}
            instructions={cocktail.instructions}
            notes={cocktail.notes}
            matchingIngredientsAmount={cocktail.matchingIngredientsAmount}
          />
        ))}
      </ul>
      {totalCocktails !== 0 && (
        <PaginationButtons
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default CocktailList;
