import classes from "./CocktailDetail.module.css";
import Card from "../ui/Card";
import Image from "next/image";

const CocktailDetail: React.FC<{
  name: string;
  category: string;
  image: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  garnish: string;
  notes: string;
}> = (props) => {
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
