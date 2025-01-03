import { RouletteState, rouletteSlice } from "./rouletteSlice"; // Adjust the import path as needed

const { reducer, actions } = rouletteSlice;
const { setMustSpin, setPrizeNumber } = actions;

describe("roulette reducer", () => {
  let initialState: RouletteState;

  beforeEach(() => {
    initialState = {
      mustSpin: false,
      prizeNumber: 0,
      activeCategory: null,
      difficultyLevel: "easy",
    };
  });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setMustSpin", () => {
    const newState = reducer(initialState, setMustSpin(true));
    expect(newState.mustSpin).toBe(true);
  });

  it("should handle setPrizeNumber", () => {
    const newPrizeNumber = 2;
    const newState = reducer(initialState, setPrizeNumber(newPrizeNumber));
    expect(newState.prizeNumber).toBe(newPrizeNumber);
  });

  it("should not modify other state properties when one property is updated", () => {
    const intermediateState = reducer(initialState, setMustSpin(true));
    const newState = reducer(intermediateState, setPrizeNumber(3));

    expect(newState.mustSpin).toBe(true);
    expect(newState.prizeNumber).toBe(3);
  });
});
