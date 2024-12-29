import React from "react";
import { Wheel } from "react-custom-roulette";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

const mustSpin = signal(false);
const prizeNumber = signal(0);
const count = signal(0);
const data = [{ option: "0" }, { option: "1" }, { option: "2" }];

export function Roulette() {
  const handleSpinClick = () => {
    if (!mustSpin.value) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      console.log("WTF ");
      prizeNumber.value = newPrizeNumber; // Update the signal
      mustSpin.value = true; // Update the signal
    }
  };

  return (
    <>
      <p>Value: {count.value}</p>;
      <Wheel
        mustStartSpinning={mustSpin.value}
        prizeNumber={prizeNumber.value}
        data={data}
        onStopSpinning={() => {
          mustSpin.value = false;
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
      <button
        onClick={() => {
          count.value = 2;
        }}
      >
        SPIN
      </button>
    </>
  );
};
