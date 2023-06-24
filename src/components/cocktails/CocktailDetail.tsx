import classes from "./CocktailDetail.module.css";
import Card from "../ui/Card";
import Image from "next/image";
import { Cocktail } from "@/models/cocktails";

const CocktailDetail: React.FC<Cocktail> = (props) => {
  return (
    <Card>
      <div className={classes.detail}>
        <Image
          src={props.image}
          alt={props.name}
          className={classes.image}
          width={500}
          height={300}
        />
      </div>
    </Card>
  );
};

export default CocktailDetail;
