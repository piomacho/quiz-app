import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionType {
  id: number;
  question: string;
  description: string | null;
  answers: Record<string, string>;
  multiple_correct_answers: "true" | "false";
  correct_answers: Record<string, "true" | "false">;
  explanation: string | null;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface QuestionState {
  questions: QuestionType[];
  userAnswers: Record<string, string[]>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  userAnswers: {},
  status: "idle",
  error: null,
};

// Thunk to fetch questions from an API
export const fetchQuestions = createAsyncThunk<
  QuestionType[],
  { activeCategory: string; difficultyLevel: string },
  { rejectValue: string }
>(
  "questions/fetchQuestions",
  async ({ activeCategory, difficultyLevel }, { rejectWithValue }) => {
    const apiUrl = "https://quizapi.io/api/v1/questions";
    const params = new URLSearchParams({
      apiKey: "ULgwn5G3ilKp7nTpyX12EHKYrhIRZ9O2mb0RD8QK",
      limit: "20",
      categor: activeCategory,
      difficulty: difficultyLevel,
    });

    try {
      const response = await fetch(`${apiUrl}?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data: QuestionType[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuestionType[]>) => {
      state.questions = action.payload;
    },
    setUserAnswer: (
      state,
      action: PayloadAction<{ questionId: number; answer: string[] }>
    ) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchQuestions.fulfilled,
        (state, action: PayloadAction<QuestionType[]>) => {
          state.status = "succeeded";
          state.questions = action.payload;
        }
      )
      .addCase(
        fetchQuestions.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const { setQuestions, setUserAnswer } = questionsSlice.actions;

export default questionsSlice.reducer;
