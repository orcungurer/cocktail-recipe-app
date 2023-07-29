import classes from "./NewCocktailForm.module.css";
import { useRef } from "react";
import Card from "../ui/Card";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface NewCocktailFormProps {
  onAddCocktail: (cocktailData: {
    name: string;
    // image?: string;
    ingredients: string;
    instructions: string;
    notes?: string;
    date: string;
  }) => void;
}

const NewCocktailForm: React.FC<NewCocktailFormProps> = (props) => {
  const name = useRef<HTMLInputElement>(null);
  // const image = useRef<HTMLInputElement>(null);
  const ingredients = useRef<HTMLInputElement>(null);
  const instructions = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLInputElement>(null);
  const date = new Date().toString();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = name.current!.value;
    // const enteredImage = image.current?.value;
    const enteredIngredients = ingredients.current!.value;
    const enteredInstructions = instructions.current!.value;
    const enteredNotes = notes.current?.value;

    if (enteredName.trim().length === 0) {
      return;
    }

    const cocktailData = {
      name: enteredName,
      // image: enteredImage,
      ingredients: enteredIngredients,
      instructions: enteredInstructions,
      notes: enteredNotes,
      date: date,
    };

    props.onAddCocktail(cocktailData);
  };

  const inputs = [
    {
      id: "name",
      label: "Cocktail Name",
      ref: name,
      placeholder: "Jager & Beer",
      required: true,
    },
    {
      id: "ingredients",
      label: "Cocktail Ingredients",
      ref: ingredients,
      placeholder: "Jagermeister (1.5oz), Beer (12oz)",
      required: true,
    },
    {
      id: "instructions",
      label: "Cocktail Instructions",
      ref: instructions,
      placeholder: "Step 1, Step 2, Step 3, ..",
      required: true,
    },
    {
      id: "notes",
      label: "Cocktail Notes",
      ref: notes,
      placeholder: "It is recommended that ...",
      required: false,
    },
  ];

  return (
    <Card className={classes.card}>
      <form onSubmit={submitHandler} className={classes.form}>
        {inputs.map((input) => (
          <div key={input.id} className={classes.control}>
            <label htmlFor={input.id} className={inter.className}>
              {input.label}
            </label>
            <input
              type="text"
              className={inter.className}
              id={input.id}
              ref={input.ref}
              required={input.required}
              placeholder={input.placeholder}
            />
          </div>
        ))}
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default NewCocktailForm;
