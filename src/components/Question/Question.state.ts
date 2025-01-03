import {
  QuestionType,
  setUserAnswer,
} from "../../state/questions/questionsSlice";
import { store } from "../../store/store";

export class QuestionState {
  public constructor() {}

  public handleAnswerChange = (questionId: number, answer: string) => {
    const {
      questions: { userAnswers },
    } = store.getState();

    const currentAnswers = userAnswers[questionId] || [];
    const newAnswers = currentAnswers.includes(answer)
      ? currentAnswers.filter((ans: string) => ans !== answer) // Unselect if already selected
      : [...currentAnswers, answer]; // Add new answer
    store.dispatch(setUserAnswer({ questionId, answer: newAnswers }));
  };

  public isAnswerCorrect = (
    question: QuestionType,
    selectedAnswers: string[]
  ) => {
    if (!selectedAnswers || selectedAnswers.length === 0) return false;
    const correctAnswers = Object.keys(question.correct_answers).filter(
      (key) => question.correct_answers[key] === "true"
    );
    const correctAnswerKeys = correctAnswers.map((key) =>
      key.replace("_correct", "")
    );

    console.log("correct ans : ", correctAnswers);
    return (
      correctAnswerKeys.length === selectedAnswers.length &&
      correctAnswerKeys.every((key) => selectedAnswers.includes(key))
    );
  };
}
