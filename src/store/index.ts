import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;

// useSelector's state
// usage: const .. = useSelector((state: RootState) => ..);
export type RootState = ReturnType<typeof store.getState>;
