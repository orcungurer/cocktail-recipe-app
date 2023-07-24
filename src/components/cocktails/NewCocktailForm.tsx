import classes from "./NewCocktailForm.module.css";
import { useRef } from "react";
import Card from "../ui/Card";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface NewCocktailFormProps {
  onAddCocktail: (cocktailData: {
    name: string;
    image?: string;
    ingredients?: string;
    instructions?: string;
    notes?: string;
    date: string;
  }) => void;
}

const NewCocktailForm: React.FC<NewCocktailFormProps> = (props) => {
  const name = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const ingredients = useRef<HTMLInputElement>(null);
  const instructions = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLInputElement>(null);
  const date = new Date().toString();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = name.current!.value;
    const enteredImage = image.current?.value;
    const enteredIngredients = ingredients.current?.value;
    const enteredInstructions = instructions.current?.value;
    const enteredNotes = notes.current?.value;

    if (enteredName.trim().length === 0) {
      return;
    }

    const cocktailData = {
      name: enteredName,
      image: enteredImage,
      ingredients: enteredIngredients,
      instructions: enteredInstructions,
      notes: enteredNotes,
      date: date,
    };

    props.onAddCocktail(cocktailData);
  };

  return (
    <Card className={classes.card}>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name" className={inter.className}>
            Cocktail Name
          </label>
          <input type="text" id="name" ref={name} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="image" className={inter.className}>
            Cocktail Image
          </label>
          <input type="text" id="image" ref={image} />
        </div>
        <div className={classes.control}>
          <label htmlFor="ingredients" className={inter.className}>
            Cocktail Ingredients
          </label>
          <input type="text" id="ingredients" ref={ingredients} />
        </div>
        <div className={classes.control}>
          <label htmlFor="intructions" className={inter.className}>
            Cocktail Instructions
          </label>
          <input type="text" id="intructions" ref={instructions} />
        </div>
        <div className={classes.control}>
          <label htmlFor="notes" className={inter.className}>
            Cocktail Notes
          </label>
          <input type="text" id="notes" ref={notes} />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default NewCocktailForm;
