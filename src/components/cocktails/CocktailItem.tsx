import classes from "./CocktailItem.module.css";
import Card from "../ui/Card";
import Image from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import { useRouter } from "next/router";
import { Cocktail } from "@/models/cocktails";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

interface CocktailWithMatchingIngredients extends Cocktail {
  matchingIngredientsAmount: number;
}

const CocktailItem: React.FC<CocktailWithMatchingIngredients> = (props) => {
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push("/" + props.cocktailId);
  };

  const ingredientsAmount = props.ingredients.length;

  const missingAmount = ingredientsAmount - props.matchingIngredientsAmount;

  let ingredientText = `${missingAmount} ingredient(s) away.`;

  if (missingAmount === 0) {
    ingredientText = "Ready to make! 🎉";
  }

  return (
    <li className={classes.item}>
      <Card>
        <Image
          src={`/images/${props.cocktailId}.jpg`}
          alt={props.name}
          className={classes.image}
          width={500}
          height={300}
        />
        <div className={classes.cocktail}>
          <h4 className={playfair.className}>{props.name}</h4>
          <div className={`${classes.ingredients} ${classes.scrollable}`}>
            {props.ingredients.map((ingredient) => (
              <span key={ingredient.name} className={inter.className}>
                {ingredient.name}
              </span>
            ))}
          </div>
          <p className={inter.className}>{ingredientText}</p>
        </div>
        <div className={classes.actions}>
          <button className={inter.className} onClick={showDetailsHandler}>
            View Recipe
          </button>
        </div>
      </Card>
    </li>
  );
};

export default CocktailItem;
