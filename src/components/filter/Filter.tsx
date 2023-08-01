import classes from "./Filter.module.css";
import { useId } from "react";
import Select, { ActionMeta, CSSObjectWithLabel } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "@/store/filter-slice";
import { RootState } from "@/store";
import Searchbar from "../filter/Searchbar";
import { CocktailsProps } from "@/models/cocktails";

interface IngredientOption {
  value: string;
  label: string;
}

const Filter: React.FC<CocktailsProps> = (props) => {
  const dispatch = useDispatch();

  const selectedIngredients = useSelector(
    (state: RootState) => state.filter.selectedIngredients
  );

  const selectedIngredientsAsDefault = selectedIngredients.map(
    (ingredient) => ({
      value: ingredient,
      label: ingredient,
    })
  );

  // by flattenning cocktails, we map each cocktail's ingredients
  // then we map through each ingredient and get the name
  // and then we create a new set to remove duplications
  // after that we convert the set back into an array
  // thus we can sort it alphabetically since its array
  // finally we map again to set value and label properties
  const ingredientOptions: IngredientOption[] = Array.from(
    new Set(
      props.cocktails.flatMap((cocktail) =>
        cocktail.ingredients.map((ingredient) => ingredient.name)
      )
    )
  )
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ({ value: name, label: name }));

  const selectIngredientsHandler = (
    newValue: readonly IngredientOption[],
    actionMeta: ActionMeta<IngredientOption>
  ) => {
    const mutableValue = Array.from(newValue); // or [...newValue]

    console.log("mutableValue", mutableValue);
    console.log("actionMeta", actionMeta);

    if (actionMeta.action === "select-option") {
      dispatch(filterActions.addIngredient(actionMeta.option!.value));
    } else if (actionMeta.action === "remove-value") {
      dispatch(filterActions.removeIngredient(actionMeta.removedValue.value));
    } else if (actionMeta.action === "clear") {
      dispatch(filterActions.clearIngredient());
    }
  };

  // to prevent provided error, used CSSObjectWithLabel as type
  // for styles, we could also use StylesConfig of react-select
  const customStyles = {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      fontFamily: "Inter, Arial, sans-serif",
    }),
    option: (provided: CSSObjectWithLabel) => ({
      ...provided,
      fontFamily: "Inter, Arial, sans-serif",
    }),
    multiValue: (styles: CSSObjectWithLabel) => {
      return {
        ...styles,
        backgroundColor: 'lightsalmon',
      };
    },
    multiValueRemove: (styles: CSSObjectWithLabel) => ({
      ...styles,
      // backgroundColor: 'rgba(255, 99, 71, 0.1)',
      color: 'white',
      ':hover': {
        backgroundColor: 'rgba(255, 99, 71, 0.5)',
      },
    }),
  };

  return (
    <div className={classes.banner}>
      <div className={classes.filter}>
        <Searchbar />
        <Select
          styles={customStyles}
          placeholder={"Select Ingredients..."}
          defaultValue={selectedIngredientsAsDefault}
          instanceId={useId()}
          isMulti
          name="ingredients"
          options={ingredientOptions}
          onChange={selectIngredientsHandler}
        />
      </div>
    </div>
  );
};

export default Filter;
