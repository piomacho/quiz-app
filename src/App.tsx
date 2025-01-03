import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Wheel } from "react-custom-roulette";
import { rouletteSlice } from "./state/roulette/rouletteSlice";
import { store } from "./store/store";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Slider from "./components/Slider";
import Quiz from "./components/Quiz/Quiz";
import styled from "styled-components";
// Define the type for the state interface

// Redux slice

const { actions, reducer } = rouletteSlice;
const { setMustSpin, setCategory, setPrizeNumber, setDifficultyLevel } =
  actions;

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const data = [
  {
    id: 1,
    option: "Linux",
    style: { backgroundColor: "#640D5F", textColor: "#ffffff" },
  },
  {
    id: 2,
    option: "bash",
    style: { backgroundColor: "#D91656", textColor: "#ffffff" },
  },
  {
    id: 4,
    option: "Docker",
    style: { backgroundColor: "#EE66A6", textColor: "#ffffff" },
  },
  {
    id: 5,
    option: "SQL",
    style: { backgroundColor: "#26355D", textColor: "#ffffff" },
  },
  {
    id: 8,
    option: "DevOps",
    style: { backgroundColor: "#AF47D2", textColor: "#ffffff" },
  },
  {
    id: 9,
    option: "React",
    style: { backgroundColor: "#FF8F00", textColor: "#ffffff" },
  },
  {
    id: 11,
    option: "Postgres",
    style: { backgroundColor: "#FFDB00", textColor: "#000000" },
  },
  {
    id: 14,
    option: "NodeJs",
    style: { backgroundColor: "#FFAA80", textColor: "#ffffff" },
  },
  {
    id: 16,
    option: "Next.js",
    style: { backgroundColor: "#FFFF80", textColor: "#000000" },
  },
  {
    id: 18,
    option: "Apache Kafka",
    style: { backgroundColor: "#FF0080", textColor: "#ffffff" },
  },
];
// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Start content at the top */
  justify-content: flex-start; /* Start content at the top */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 2rem; /* Add padding for aesthetics */
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: sticky;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ff6666;
  }
`;

const SpinButton = styled.button<{ isTestReady: boolean }>`
  margin-top: 20px;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background: ${(props) =>
    props.isTestReady
      ? "linear-gradient(45deg, #00c853, #b2ff59)"
      : "linear-gradient(45deg, #ff0000, #ff7f00, #ffd700)"};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isTestReady
      ? "0 0 15px rgba(178, 255, 89, 0.8), 0 0 30px rgba(0, 200, 83, 0.6)"
      : "0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 127, 0, 0.6)"};

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: ${(props) =>
      props.isTestReady
        ? "0 0 30px rgba(178, 255, 89, 1), 0 0 50px rgba(0, 200, 83, 0.8)"
        : "0 0 30px rgba(245, 215, 0, 1), 0 0 50px rgba(245, 127, 0, 0.8)"};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
`;

const SpinnerSound = new Audio("/start.mp3");

function Roulette() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const { mustSpin, prizeNumber, difficultyLevel } = useSelector(
    (state: RootState) => state.roulette
  );
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTestReady, setIsTestReady] = useState(false);

  const handleSpinClick = () => {
    if (!mustSpin && !isTestReady) {
      SpinnerSound.play();
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      dispatch(setPrizeNumber(newPrizeNumber));
      dispatch(setMustSpin(true));
    } else if (isTestReady) {
      setIsQuizOpen(true);
    }
  };

  const closeTest = () => {
    dispatch(setCategory(null));
    dispatch(setDifficultyLevel("medium"));
    setIsQuizOpen(false);
    setIsTestReady(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          spinDuration={0.5}
          onStopSpinning={() => {
            dispatch(setMustSpin(false));
            dispatch(setCategory(data[prizeNumber].option));
            setIsTestReady(true);
          }}
        />
        <SpinButton isTestReady={isTestReady} onClick={handleSpinClick}>
          {isTestReady ? "START TEST" : "🎰 SPIN 🎰"}
        </SpinButton>
        <Slider difficultyLevel={difficultyLevel} />

        {isQuizOpen && (
          <Overlay>
            <CloseButton onClick={closeTest}>✖</CloseButton>
            <Quiz />
          </Overlay>
        )}
      </Container>
    </QueryClientProvider>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <Roulette />
    </Provider>
  );
}
