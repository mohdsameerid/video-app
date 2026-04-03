import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    items: [],
    nextPageToken: null,
    isFetching: false,
  },
  reducers: {
    setVideos: (state, action) => {
      state.items = action.payload.items;
      state.nextPageToken = action.payload.nextPageToken || null;
    },
    appendVideos: (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.nextPageToken = action.payload.nextPageToken || null;
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setVideos, appendVideos, setFetching } = videosSlice.actions;
export default videosSlice.reducer;
