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

  // We map through the cocktails and check if each cocktail's
  // ingredients are included in the selectedIngredients.
  // If an ingredient is found in selectedIngredients,
  // we store the number of matching ingredients.
  // Then, we add the matchingIngredientsAmount property to each cocktail object.
  // Next, we filter the cocktails based on the following conditions:
  // - If no ingredients are selected, we render all cocktails.
  // - If at least one ingredient is selected,
  //   we render only the cocktails that have at least one matching ingredient.
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
        selectedIngredients.length === 0 ||
        cocktail.matchingIngredientsAmount > 0
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
          matchingIngredientsAmount={cocktail.matchingIngredientsAmount}
        />
      ))}
    </ul>
  );
};

export default CocktailList;
