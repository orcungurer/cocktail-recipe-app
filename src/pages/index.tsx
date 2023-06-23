import { Fragment } from "react";
import CocktailList from "@/components/cocktails/CocktailList";
import { DUMMY_COCKTAILS } from "@/components/data";

const HomePage = () => {
  return (
    <Fragment>
      <CocktailList cocktails={DUMMY_COCKTAILS} />
    </Fragment>
  );
};

export default HomePage;
