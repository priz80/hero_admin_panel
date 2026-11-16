import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  activeFilter: "all",
  filtersLoadingStatus: "idle",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = "idle";
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = "error";
    },
    filterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filterChanged,
} = filtersSlice.actions;

export default filtersSlice.reducer;
