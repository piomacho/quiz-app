import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { fetchQuestions } from "../../features/questionsSlice";
import { RootState } from "../../App";
import { Question } from "../Question/Question";
import { fetchQuestions } from "../../state/questions/questionsSlice";
import { AppDispatch } from "../../store/store";

const QuizContainer = styled.div`
  width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  &::after {
    content: "";
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top: 5px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const QuizForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, status, error } = useSelector(
    (state: RootState) => state.questions
  );
  const { activeCategory, difficultyLevel } = useSelector(
    (state: RootState) => state.roulette
  );

  useEffect(() => {
    if (activeCategory !== null) {
      dispatch(fetchQuestions({ activeCategory, difficultyLevel }));
    }
  }, [dispatch, activeCategory, difficultyLevel]);

  return (
    <QuizContainer>
      <Title>Quiz</Title>
      {/* Loader */}
      {status === "loading" && <Loader />}

      {/* Error Message */}
      {status === "failed" && <ErrorMessage>{error}</ErrorMessage>}

      {status === "succeeded" &&
        questions.map((question) => <Question question={question} />)}
    </QuizContainer>
  );
};

export default QuizForm;
