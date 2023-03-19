import { createSlice } from "@reduxjs/toolkit";
import { LIVE_MESSAGE_CHAT } from "../config";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    message: [],
  },
  reducers: {
    addMessage: (state, action) => {
      if (state.message.length === LIVE_MESSAGE_CHAT) {
        state.message.splice(0, 1);
      }
      state.message.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
