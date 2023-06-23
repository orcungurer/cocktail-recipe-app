import classes from "./CocktailList.module.css";
import CocktailItem from "./CocktailItem";

interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  garnish: string;
  notes: string;
}

export interface CocktailListProps {
  cocktails: Cocktail[];
}

const CocktailList: React.FC<CocktailListProps> = (props) => {
  return (
    <ul className={classes.list}>
      {props.cocktails.map((cocktail) => (
        <CocktailItem 
          key={cocktail.id}
          id= {cocktail.id}
          name={cocktail.name}
          category={cocktail.category}
          image={cocktail.image}
          ingredients={cocktail.ingredients}
          // instructions={cocktail.instructions}
          // garnish={cocktail.garnish}
          // notes={cocktail.notes}
        />
      ))}
    </ul>
  );
};

export default CocktailList;
