import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { QuestionType } from "../../state/questions/questionsSlice";
import { RootState } from "../../App";
import { QuestionState } from "./Question.state";

const QuestionContainer = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

const QuestionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  text-align: center;
`;
const DescriptionMultipleAnswers = styled.p`
  font-size: 1.5rem;
  color: #ffc300;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AnswerLabel = styled.label<{ isCorrect?: boolean; isSelected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: ${(props) =>
    props.isSelected ? "2px solid #3498db" : "1px solid #e0e0e0"};
  background-color: ${(props) =>
    props.isSelected ? "#ecf5ff" : props.isCorrect ? "#eafbe7" : "#ffffff"};
  font-size: 1rem;
  color: ${(props) =>
    props.isCorrect ? "#27ae60" : props.isSelected ? "#3498db" : "#34495e"};
  cursor: ${(props) => (props.isSelected ? "default" : "pointer")};
  transition: all 0.3s ease;

  & input {
    margin-right: 10px;
  }
`;

const Feedback = styled.p<{ correct?: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => (props.correct ? "#27ae60" : "#e74c3c")};
`;

const SubmitButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #3498db;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

interface QuestionComponentType {
  question: QuestionType;
}

export const Question = ({ question }: QuestionComponentType) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const { userAnswers } = useSelector((state: RootState) => state.questions);
  const [state] = useState(() => new QuestionState());

  const handleAnswerChange = (answerKey: string) => {
    console.log("klikn");
    if (isAnswered) return; // Nie pozwalaj na zmianę odpowiedzi po odpowiedzi
    state.handleAnswerChange(question.id, answerKey);
  };

  const correctAnswers = Object.entries(question.correct_answers)
    .filter(([key, value]) => value === "true")
    .map(([key]) => key.replace("_correct", ""));

  const userAnswer = userAnswers[question.id] || [];
  const isCorrect = state.isAnswerCorrect(question, userAnswer);

  return (
    <QuestionContainer data-test="question-component" key={question.id}>
      <QuestionTitle>{question.question}</QuestionTitle>
      <Description>{question.description}</Description>
      <DescriptionMultipleAnswers>
        {question.multiple_correct_answers === "true"
          ? "Multiple correct answers 🔔"
          : null}
      </DescriptionMultipleAnswers>
      <AnswersContainer>
        {Object.entries(question.answers).map(
          ([key, value]) =>
            value && (
              <AnswerLabel
                key={key}
                isCorrect={isAnswered && correctAnswers.includes(key)}
                isSelected={userAnswer.includes(key)}
              >
                <input
                  type="checkbox"
                  data-test="answer-checkbox"
                  name={`question-${question.id}`}
                  value={key}
                  onChange={() => handleAnswerChange(key)}
                  checked={userAnswer.includes(key)}
                  disabled={isAnswered} // Zablokuj checkboxy po odpowiedzi
                />
                {value}
                {isAnswered && correctAnswers.includes(key) ? " ✅" : null}
                {isAnswered && !correctAnswers.includes(key) ? " ❌" : null}
              </AnswerLabel>
            )
        )}
      </AnswersContainer>

      <SubmitButton
        data-test="submit-button"
        onClick={() => setIsAnswered(true)}
        disabled={isAnswered}
      >
        Submit
      </SubmitButton>

      {isAnswered ? (
        <Feedback data-test="feedback-text" correct={isCorrect}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </Feedback>
      ) : null}
    </QuestionContainer>
  );
};
