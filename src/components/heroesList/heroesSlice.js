import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/heroes");
      if (!response.ok) throw new Error("Could not fetch heroes");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroAdd: (state, action) => {
      state.heroes.push(action.payload);
    },
    heroDelete: (state, action) => {
      state.heroes = state.heroes.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      });
  },
});

export const { heroAdd, heroDelete } = heroesSlice.actions;

export default heroesSlice.reducer;
