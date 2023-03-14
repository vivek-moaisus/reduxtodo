import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/reducers";

const store = configureStore({
  reducer: {
    item: rootReducer,
  },
});

export default store;
