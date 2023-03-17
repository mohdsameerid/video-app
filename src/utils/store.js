/**
 *  1) Configure Store
 *  2) Provide the Store to our app
 *  3) create a slice
 *  4) read or write data.
 *
 */
import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    navCard: navSlice,
    search: searchSlice,
  },
});

export default store;
