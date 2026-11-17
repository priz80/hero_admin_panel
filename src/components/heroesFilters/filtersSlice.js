import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFilters } from "../../services/api";

export const fetchFiltersAsync = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    return await fetchFilters();
  }
);

const initialState = {
  filters: [],
  activeFilter: "all",
  filtersLoadingStatus: "idle",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersAsync.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFiltersAsync.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        state.filters = action.payload;
      })
      .addCase(fetchFiltersAsync.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      });
  },
});

export const { filterChanged: filterChangedAction } = filtersSlice.actions;

export const filterChanged = (filter) => (dispatch) => {
  setTimeout(() => {
    dispatch(filterChangedAction(filter));
  }, 1000);
};

export default filtersSlice.reducer;
