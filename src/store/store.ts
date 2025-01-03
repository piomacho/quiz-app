import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { rouletteSlice } from "../state/roulette/rouletteSlice";
import { questionsSlice } from "../state/questions/questionsSlice";

export const store = configureStore({
  reducer: {
    roulette: rouletteSlice.reducer,
    questions: questionsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
