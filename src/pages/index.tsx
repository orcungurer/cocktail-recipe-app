import { Fragment } from "react";
import CocktailList from "@/components/cocktails/CocktailList";
// import { DUMMY_COCKTAILS } from "@/components/data";
import { CocktailsProps } from "@/models/cocktails";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import Head from "next/head";

dotenv.config();

const HomePage: React.FC<CocktailsProps> = (props) => {
  console.log(props.cocktails);

  return (
    <Fragment>
      <Head>
        <title>Cocktail Recipe</title>
        <meta
          name="description"
          content="Explore our extensive collection of cocktails and find your perfect drink! Easily search for specific cocktails or utilize our ingredient filter feature to discover cocktails you can create using the ingredients you already have."
        />
      </Head>
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
