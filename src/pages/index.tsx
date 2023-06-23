import { Fragment } from "react";
import CocktailList from "@/components/cocktails/CocktailList";
import { DUMMY_COCKTAILS } from "@/components/data";
import { CocktailsProps } from "@/models/cocktails";

const HomePage: React.FC<CocktailsProps> = (props) => {
  return (
    <Fragment>
      <CocktailList cocktails={props.cocktails} />
    </Fragment>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  return {
    props: {
      cocktails: DUMMY_COCKTAILS,
    },
  };
};
