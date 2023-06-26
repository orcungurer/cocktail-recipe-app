import classes from "./CocktailList.module.css";
import CocktailItem from "./CocktailItem";
import { CocktailsProps } from "@/models/cocktails";

const CocktailList: React.FC<CocktailsProps> = (props) => {
  return (
    <ul className={classes.list}>
      {props.cocktails.map((cocktail) => (
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
