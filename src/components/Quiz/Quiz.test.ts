import React from "react";
import { render, screen } from "@testing-library/react";
import { QuestionState } from "../Question/Question.state";
import { store } from "../../store/store";
import { QuestionType } from "../../state/questions/questionsSlice";

const testQuestions: QuestionType[] = [
  {
    id: 1,
    question: "How to delete a directory in Linux?",
    description: "delete folder",
    answers: {
      answer_a: "ls",
      answer_b: "delete",
      answer_c: "remove",
      answer_d: "rmdir",
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "true",
    },
    explanation: "rmdir deletes an empty directory",
    category: "linux",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "Which of these are Linux commands?",
    description: "multiple choices",
    answers: {
      answer_a: "ls",
      answer_b: "delete",
      answer_c: "cd",
      answer_d: "pwd",
    },
    multiple_correct_answers: "true",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "true",
      answer_d_correct: "true",
    },
    explanation: "ls, cd, and pwd are valid Linux commands.",
    category: "linux",
    difficulty: "Medium",
  },
];

describe("QuizState", () => {
  test("should update the state when handleAnswerChange is called", () => {
    const quizState = new QuestionState();

    // Initial check
    let currentState = store.getState();
    expect(currentState.questions.userAnswers[1]).toBeUndefined();

    // Dispatch action using the method
    quizState.handleAnswerChange(1, "Answer1");

    // Check if state is updated
    currentState = store.getState();
    expect(currentState.questions.userAnswers[1]).toEqual(["Answer1"]);
  });

  test("should verify the answear with 1 option correct", () => {
    const quizState = new QuestionState();

    const isCorrect = quizState.isAnswerCorrect(testQuestions[0], ["answer_c"]);
    expect(isCorrect).toBeFalsy();

    const isCorrectSecondTry = quizState.isAnswerCorrect(testQuestions[0], [
      "answer_d",
    ]);
    expect(isCorrectSecondTry).toBeTruthy();
  });

  test("should verify the answear with several option correct", () => {
    const quizState = new QuestionState();

    const isCorrect = quizState.isAnswerCorrect(testQuestions[1], ["answer_c"]);
    expect(isCorrect).toBeFalsy();

    const isCorrectSecondTry = quizState.isAnswerCorrect(testQuestions[1], [
      "answer_c",
      "answer_a",
    ]);
    expect(isCorrectSecondTry).toBeFalsy();

    const isCorrectThirdTry = quizState.isAnswerCorrect(testQuestions[1], [
      "answer_c",
      "answer_a",
      "answer_d",
    ]);
    expect(isCorrectThirdTry).toBeTruthy();
  });
});
