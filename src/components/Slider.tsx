import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { rouletteSlice } from "../state/roulette/rouletteSlice";
import { AppDispatch } from "../store/store";

// Styled components
const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PickerButton = styled.div<{ active: boolean }>`
  background: ${({ active }) =>
    active
      ? "linear-gradient(45deg, #ff6f00, #d32f2f)" // Orange to Red gradient when active
      : "#333"};
  color: ${({ active }) => (active ? "#fff" : "#aaa")};
  padding: 15px 30px;
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) =>
      active
        ? "linear-gradient(45deg, #ff9100, #e53935)" // Lighter orange to red gradient on hover
        : "#444"};
    transform: scale(1.05); /* Subtle scale effect on hover */
  }
`;

const options = ["easy", "medium", "hard"];

const { actions } = rouletteSlice;
const { setDifficultyLevel } = actions;

export const DifficultyPicker = ({
  difficultyLevel,
}: {
  difficultyLevel: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState(difficultyLevel);

  useEffect(() => {
    if (difficultyLevel === "easy") {
      setSelectedValue("easy");
    } else if (difficultyLevel === "medium") {
      setSelectedValue("medium");
    } else if (difficultyLevel === "hard") {
      setSelectedValue("hard");
    }
  }, [difficultyLevel]); // Trigger on difficultyLevel change

  const handleSelect = (selectedOption: string) => {
    setSelectedValue(selectedOption); // Update local state
    dispatch(setDifficultyLevel(selectedOption)); // Update global state
  };

  return (
    <PickerContainer>
      {options.map((option) => (
        <PickerButton
          key={option}
          active={selectedValue === option}
          onClick={() => handleSelect(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
          {/* Capitalize option */}
        </PickerButton>
      ))}
    </PickerContainer>
  );
};

export default DifficultyPicker;
