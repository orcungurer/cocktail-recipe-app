export interface Cocktail {
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
}

export interface CocktailsProps {
  cocktails: Cocktail[];
}
