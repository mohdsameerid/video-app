/**
 *  1) Configure Store
 *  2) Provide the Store to our app
 *  3) create a slice
 *  4) read or write data.
 *
 */
import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import navSlice from "./navSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    navCard: navSlice,
    search: searchSlice,
    chat: chatSlice,
  },
});

export default store;
