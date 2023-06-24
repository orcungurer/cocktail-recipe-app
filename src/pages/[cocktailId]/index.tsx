import CocktailDetail from "@/components/cocktails/CocktailDetail";
import { GetStaticProps } from "next";

const CocktailDetailsPage = () => {
  return (
    <CocktailDetail
      name="Cocktail"
      category="Cocktail"
      image="https://www.thespruceeats.com/thmb/HEcHMz3CP-zjQSgdvlEEfYBqO6o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jager-bomb-recipe-759713-hero-01-54560094d6cd4d97bbea810aa07e772b.jpg"
      ingredients={[
        {
          name: "Jagermeister",
          amount: "1.5 oz",
        },
        {
          name: "Energy drink",
          amount: "4 oz",
        },
      ]}
      instructions={[
        "Fill a shot glass with Jagermeister.",
        "Pour an energy drink into a glass.",
        "Drop the shot glass into the glass and drink.",
      ]}
      garnish="None"
      notes="It is recommended to drink this cocktail quickly to enjoy the combined flavors."
    />
  );
};

export default CocktailDetailsPage;

export const getStaticPaths = () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          cocktailId: "1",
        },
      },
      {
        params: {
          cocktailId: "2",
        },
      },
    ],
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cocktailId = context.params?.cocktailId;

  return {
    props: {
      cocktailData: {
        id: cocktailId,
        name: "Cocktail",
        category: "Cocktail",
        image:
          "https://www.thespruceeats.com/thmb/HEcHMz3CP-zjQSgdvlEEfYBqO6o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jager-bomb-recipe-759713-hero-01-54560094d6cd4d97bbea810aa07e772b.jpg",
        ingredients: [
          {
            name: "Jagermeister",
            amount: "1.5 oz",
          },
          {
            name: "Energy drink",
            amount: "4 oz",
          },
        ],
        instructions: [
          "Fill a shot glass with Jagermeister.",
          "Pour an energy drink into a glass.",
          "Drop the shot glass into the glass and drink.",
        ],
        garnish: "None",
        notes:
          "It is recommended to drink this cocktail quickly to enjoy the combined flavors.",
      },
    },
  };
};
