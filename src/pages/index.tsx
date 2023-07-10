import { Fragment, useId } from "react";
import CocktailList from "@/components/cocktails/CocktailList";
// import { DUMMY_COCKTAILS } from "@/components/data";
import { CocktailsProps } from "@/models/cocktails";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Head from "next/head";
import Select, { ActionMeta, CSSObjectWithLabel } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "@/store/filter-slice";
import { RootState } from "@/store";
import { Inter } from "next/font/google";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

interface IngredientOption {
  value: string;
  label: string;
}

const HomePage: React.FC<CocktailsProps> = (props) => {
  console.log(props.cocktails);
  const dispatch = useDispatch();

  const selectedIngredients = useSelector(
    (state: RootState) => state.filter.selectedIngredients
  );

  const selectedIngredientsAsDefault = selectedIngredients.map(
    (ingredient) => ({
      value: ingredient,
      label: ingredient,
    })
  );

  // by flattenning cocktails, we map each cocktail's ingredients
  // then we map through each ingredient and get the name
  // and then we create a new set to remove duplications
  // after that we convert the set back into an array
  // thus we can sort it alphabetically since its array
  // finally we map again to set value and label properties
  const ingredientOptions: IngredientOption[] = Array.from(
    new Set(
      props.cocktails.flatMap((cocktail) =>
        cocktail.ingredients.map((ingredient) => ingredient.name)
      )
    )
  )
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ value: name, label: name }));

  const selectIngredientsHandler = (
    newValue: readonly IngredientOption[],
    actionMeta: ActionMeta<IngredientOption>
  ) => {
    const mutableValue = Array.from(newValue); // or [...newValue]
    console.log("mutableValue", mutableValue);
    console.log("actionMeta", actionMeta);
    if (actionMeta.action === "select-option") {
      dispatch(filterActions.addIngredient(actionMeta.option!.value));
    } else if (actionMeta.action === "remove-value") {
      dispatch(filterActions.removeIngredient(actionMeta.removedValue.value));
    } else if (actionMeta.action === "clear") {
      dispatch(filterActions.clearIngredient());
    }
  };

  // to prevent provided error, used CSSObjectWithLabel as type
  const customStyles = {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      fontFamily: 'Inter, Arial, sans-serif',
    }),
    option: (provided: CSSObjectWithLabel) => ({
      ...provided,
      fontFamily: 'Inter, Arial, sans-serif',
    }),
  };

  return (
    <Fragment>
      <Head>
        <title>Cocktail Recipe</title>
        <meta
          name="description"
          content="Explore our extensive collection of cocktails and find your perfect drink! Easily search for specific cocktails or utilize our ingredient filter feature to discover cocktails you can create using the ingredients you already have."
        />
      </Head>
      <Select
        styles={customStyles}
        defaultValue={selectedIngredientsAsDefault}
        instanceId={useId()}
        isMulti
        name="ingredients"
        options={ingredientOptions}
        onChange={selectIngredientsHandler}
      />
      <CocktailList cocktails={props.cocktails} />
    </Fragment>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const mongodbUri = process.env.MONGODB_URI ?? "";

  const client = await MongoClient.connect(mongodbUri);

  const db = client.db();

  const cocktailsCollection = db.collection("cocktails");

  const cocktails = await cocktailsCollection.find().toArray();

  client.close();

  return {
    props: {
      cocktails: cocktails.map((cocktail) => ({
        id: cocktail._id.toString(),
        cocktailId: cocktail.cocktailId,
        name: cocktail.name,
        image: cocktail.image,
        ingredients: cocktail.ingredients,
        instructions: cocktail.instructions,
        notes: cocktail.notes,
      })),
    },
    revalidate: 1,
  };
};
