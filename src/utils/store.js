/**
 *  1) Configure Store
 *  2) Provide the Store to our app
 *  3) create a slice
 *  4) read or write data.
 *
 */
import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";

const store = configureStore({
  reducer: {
    navCard: navSlice,
  },
});

export default store;
