import { Fragment } from "react";
import NewCocktailForm from "@/components/cocktails/NewCocktailForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewCocktailPage = () => {
  const router = useRouter();

  const addCocktailHandler = async (enteredCocktail: {
    name: string;
    // image?: string;
    ingredients: string;
    instructions: string;
    notes?: string;
    date: string;
  }) => {
    const response = await fetch("/api/new-cocktail", {
      method: "POST",
      body: JSON.stringify(enteredCocktail),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("response", data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Suggest a New Cocktail</title>
        <meta
          name="description"
          content="Suggest a unique and delicious cocktail that is not listed in our app and share your creative mixology skills with others. Let your taste buds explore new horizons and leave a lasting impression with your signature concoction. Cheers to innovation and the joy of sharing delightful flavors!"
        />
      </Head>
      <NewCocktailForm onAddCocktail={addCocktailHandler} />
    </Fragment>
  );
};

export default NewCocktailPage;
