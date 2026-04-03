import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    // { [category]: { items: [], nextPageToken: null } }
    byCategory: {},
    isFetching: false,
  },
  reducers: {
    setVideos: (state, action) => {
      const { category, items, nextPageToken } = action.payload;
      state.byCategory[category] = { items, nextPageToken: nextPageToken || null };
    },
    appendVideos: (state, action) => {
      const { category, items, nextPageToken } = action.payload;
      const existing = state.byCategory[category]?.items || [];
      state.byCategory[category] = {
        items: [...existing, ...items],
        nextPageToken: nextPageToken || null,
      };
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setVideos, appendVideos, setFetching } = videosSlice.actions;
export default videosSlice.reducer;
