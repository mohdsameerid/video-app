import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: {
    navbutton: true,
  },
  reducers: {
    isOpen: (state) => {
      state.navbutton = !state.navbutton;
    },
  },
});

export const { isOpen } = navSlice.actions;
export default navSlice.reducer;
