import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  currentPage: number;
}

const initialState: UIState = {
  currentPage: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    increaseCurrentPage(state) {
      state.currentPage++;
    },
    decreaseCurrentPage(state) {
      state.currentPage--;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
