import { Fragment } from "react";
import NewCocktailForm from "@/components/cocktails/NewCocktailForm";
import { useRouter } from "next/router";

const NewCocktailPage = () => {
  const router = useRouter();

  const addCocktailHandler = async (enteredCocktail: {
    name: string;
    image?: string;
    ingredients?: string;
    instructions?: string;
    notes?: string;
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
      <NewCocktailForm onAddCocktail={addCocktailHandler} />
    </Fragment>
  );
};

export default NewCocktailPage;
