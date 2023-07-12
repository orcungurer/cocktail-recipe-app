import classes from "./CocktailList.module.css";
import CocktailItem from "./CocktailItem";
import { CocktailsProps } from "@/models/cocktails";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Fragment } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const CocktailList: React.FC<CocktailsProps> = (props) => {
  const selectedIngredients = useSelector(
    (state: RootState) => state.filter.selectedIngredients
  );

  console.log(selectedIngredients);

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
        selectedIngredients.length === 0 ||
        cocktail.matchingIngredientsAmount > 0
      ) {
        return true;
      }
      return false;
    });

  console.log(filteredCocktails);

  const cocktailAmountText = `${filteredCocktails.length} Cocktails`;

  return (
    <Fragment>
      <p className={`${classes["cocktail-amount"]} ${inter.className}`}>
        {cocktailAmountText}
      </p>
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
    </Fragment>
  );
};

export default CocktailList;
