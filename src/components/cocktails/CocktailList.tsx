import classes from "./CocktailList.module.css";
import CocktailItem from "./CocktailItem";
import { CocktailsProps } from "@/models/cocktails";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CocktailList: React.FC<CocktailsProps> = (props) => {
  const selectedIngredients = useSelector(
    (state: RootState) => state.filter.selectedIngredients
  );

  console.log(selectedIngredients);

  // we return a cocktail if no ingredients selected,
  // or if the cocktail includes a selected ingredient.
  const filteredCocktails = props.cocktails.filter((cocktail) => {
    if (
      selectedIngredients.length === 0 ||
      cocktail.ingredients.some((ingredient) =>
        selectedIngredients.includes(ingredient.name)
      )
    ) {
      return true;
    }
    return false;
  });

  console.log(filteredCocktails);

  return (
    <ul className={classes.list}>
      {filteredCocktails.map((cocktail) => (
        <CocktailItem
          key={cocktail.id}
          id={cocktail.id}
          cocktailId={cocktail.cocktailId}
          name={cocktail.name}
          image={cocktail.image}
          ingredients={cocktail.ingredients}
          instructions={cocktail.instructions}
          notes={cocktail.notes}
        />
      ))}
    </ul>
  );
};

export default CocktailList;
