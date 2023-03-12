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
    closeNavbar: (state) => {
      state.navbutton = false;
    },
  },
});

export const { isOpen, closeNavbar } = navSlice.actions;
export default navSlice.reducer;
