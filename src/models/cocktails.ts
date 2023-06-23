export interface Cocktail {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  instructions: string[];
  garnish: string;
  notes: string;
}

export interface CocktailsProps {
  cocktails: Cocktail[];
}
