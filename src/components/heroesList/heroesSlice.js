import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchHeroes, addHero, deleteHero } from "../../services/api";

const heroesAdapter = createEntityAdapter();

export const fetchHeroesAsync = createAsyncThunk(
  "heroes/fetchHeroes",
  async () => {
    return await fetchHeroes();
  }
);

export const heroAddAsync = createAsyncThunk(
  "heroes/heroAdd",
  async (hero, { rejectWithValue }) => {
    try {
      return await addHero(hero);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const heroDeleteAsync = createAsyncThunk(
  "heroes/heroDelete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteHero(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle",
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroesAsync.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroesAsync.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroesAsync.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addCase(heroAddAsync.fulfilled, (state, action) => {
        heroesAdapter.addOne(state, action.payload);
      })
      .addCase(heroDeleteAsync.fulfilled, (state, action) => {
        heroesAdapter.removeOne(state, action.payload);
      });
  },
});

export default heroesSlice.reducer;

export const { selectAll: selectAllHeroes } = heroesAdapter.getSelectors(
  (state) => state.heroes
);
