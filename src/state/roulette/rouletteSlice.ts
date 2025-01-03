import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RouletteState {
  mustSpin: boolean;
  prizeNumber: number;
  activeCategory: string | null;
  difficultyLevel: string;
}

// Async thunk for fetching prize number
// export const fetchPrizeNumberThunk = createAsyncThunk(
//   "roulette/fetchPrizeNumber",
//   async () => {
//     const response = await fetch("/api/prize-number");
//     if (!response.ok) {
//       throw new Error("Failed to fetch prize number");
//     }
//     return response.json();
//   }
// );

export const rouletteSlice = createSlice({
  name: "roulette",
  initialState: {
    mustSpin: false,
    prizeNumber: 0,
    activeCategory: null,
    difficultyLevel: "medium",
  } as RouletteState,
  reducers: {
    setMustSpin: (state, action: PayloadAction<boolean>) => {
      state.mustSpin = action.payload;
    },
    setPrizeNumber: (state, action: PayloadAction<number>) => {
      state.prizeNumber = action.payload;
    },

    setCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
    setDifficultyLevel: (state, action: PayloadAction<string>) => {
      state.difficultyLevel = action.payload;
    },
  },
});
