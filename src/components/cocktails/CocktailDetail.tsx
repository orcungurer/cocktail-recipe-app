import classes from "./CocktailDetail.module.css";
import Card from "../ui/Card";
import Image from "next/image";
import { Cocktail } from "@/models/cocktails";
import { Inter, Playfair_Display } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

const CocktailDetail: React.FC<Cocktail> = (props) => {
  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };

  return (
    <Card className={classes.card}>
      <div className={classes.detail}>
        <h2 className={playfair.className}>{props.name}</h2>
        <div className={classes.header}>
          <Image
            src={`/images/${props.cocktailId}.jpg`}
            alt={props.name}
            className={classes.image}
            width={500}
            height={300}
          />
        </div>
        <div className={classes.ingredients}>
          <h3 className={inter.className}>INGREDIENTS</h3>
          <ul>
            {props.ingredients.map((ingredient) => (
              <li key={ingredient.name}>
                <span className={`${classes.amount} ${inter.className}`}>
                  {ingredient.amount}
                </span>
                <span className={`${classes.name} ${inter.className}`}>
                  {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.instructions}>
          <h3 className={inter.className}>INSTRUCTIONS</h3>
          <ul>
            {props.instructions.map((instruction, index) => (
              <li key={instruction}>
                <p className={`${classes.steps} ${inter.className}`}>
                  Step {index + 1}/{props.instructions.length}
                </p>
                <p className={inter.className}>{instruction}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.notes}>
          <h3 className={inter.className}>NOTE</h3>
          <p className={inter.className}>{props.notes}</p>
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={goBackHandler}>
            Back to Cocktail List
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CocktailDetail;
