import CocktailDetail from "@/components/cocktails/CocktailDetail";
import { GetStaticProps } from "next";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Fragment } from "react";
import Head from "next/head";

dotenv.config();

interface CocktailDetailProps {
  cocktailData: {
    id: string;
    cocktailId: string;
    name: string;
    image: string;
    ingredients: {
      name: string;
      amount: string;
    }[];
    instructions: string[];
    notes: string;
  };
}

const CocktailDetailsPage: React.FC<CocktailDetailProps> = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.cocktailData.name}</title>
        <meta 
          name="description"
          content={`Prepare your ${props.cocktailData.name} drink with ease using the ingredients and step-by-step instructions provided.`} 
        />
      </Head>
      <CocktailDetail
        id={props.cocktailData.id}
        cocktailId={props.cocktailData.cocktailId}
        name={props.cocktailData.name}
        image={props.cocktailData.image}
        ingredients={props.cocktailData.ingredients}
        instructions={props.cocktailData.instructions}
        notes={props.cocktailData.notes}
      />
    </Fragment>
  );
};

export default CocktailDetailsPage;

export const getStaticPaths = async () => {
  const mongodbUri = process.env.MONGODB_URI ?? "";

  const client = await MongoClient.connect(mongodbUri);

  const db = client.db();

  const cocktailsCollection = db.collection("cocktails");

  // find all documents and only include the ID field but no any other
  // note. in js, find({}, { cocktailId: 1 }).toArray() would be enough
  const cocktails = await cocktailsCollection.find({}).project({ cocktailId: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: cocktails.map((cocktail) => ({
      params: {
        cocktailId: cocktail.cocktailId,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cocktailId = context.params?.cocktailId;

  const mongodbUri = process.env.MONGODB_URI ?? "";

  const client = await MongoClient.connect(mongodbUri);

  const db = client.db();

  const cocktailsCollection = db.collection("cocktails");

  const selectedCocktail = await cocktailsCollection.findOne({ cocktailId: cocktailId });

  return {
    props: {
      cocktailData: {
        id: selectedCocktail!._id.toString(),
        cocktailId: selectedCocktail!.cocktailId,
        name: selectedCocktail!.name,
        image: selectedCocktail!.image,
        ingredients: selectedCocktail!.ingredients,
        instructions: selectedCocktail!.instructions,
        notes: selectedCocktail!.notes,
      },
    },
  };
};
