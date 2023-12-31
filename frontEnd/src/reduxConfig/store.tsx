import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./slices/todoSlices";

const store = configureStore({
  reducer: todoSliceReducer,
});

export default store;
