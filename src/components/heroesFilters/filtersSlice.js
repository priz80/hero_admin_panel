import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/filters");
      if (!response.ok) throw new Error("Could not fetch filters");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      });
  },
});

export const { filterChanged: filterChangedAction } = filtersSlice.actions;

export const filterChanged = (filter) => (dispatch) => {
  setTimeout(() => {
    dispatch(filterChangedAction(filter));
  }, 2000);
};

export default filtersSlice.reducer;
