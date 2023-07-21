import { Fragment } from "react";
import CocktailList from "@/components/cocktails/CocktailList";
import { CocktailsProps } from "@/models/cocktails";
import Filter from "../filter/Filter";

const Cocktails: React.FC<CocktailsProps> = (props) => {
  return (
    <Fragment>
      <Filter cocktails={props.cocktails} />
      <CocktailList cocktails={props.cocktails} />
    </Fragment>
  );
};

export default Cocktails;
