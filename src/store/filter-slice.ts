import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  selectedIngredients: string[];
}

const initialState: FilterState = {
  selectedIngredients: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<string>) {
      const addedItem = action.payload;
      state.selectedIngredients.push(addedItem);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const removedItem = action.payload;
      state.selectedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient !== removedItem
      );
    },
    clearIngredient(state) {
      state.selectedIngredients = [];
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
