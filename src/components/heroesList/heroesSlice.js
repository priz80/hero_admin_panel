import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const heroesAdapter = createEntityAdapter();

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
  },
);

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',  
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroAdd: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    },
    heroDelete: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      });
  },
});

export const { heroAdd, heroDelete } = heroesSlice.actions;

export default heroesSlice.reducer;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)