import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import NewPoll from "./NewPoll";
import reducer from "../reducers";
import { handleAddQuestion } from "../actions/questions"; // Import the actual function to mock

jest.mock("../actions/questions", () => ({
  handleAddQuestion: jest.fn(),
}));

// Create the mock store with the rootReducer and any initial state
const store = configureStore({
  reducer: reducer,
  preloadedState: {
    authedUser: {
      id: "sarahedo",
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
  },
});
describe("NewPoll", () => {
  test("should render the component", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should contain all the option fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );
    const firstOptionInput = screen
      .getByTestId("first-option")
      .querySelector("input");
    const secondOptionInput = screen
      .getByTestId("second-option")
      .querySelector("input");
    screen.getByTestId("submit-button");
    fireEvent.change(firstOptionInput, {
      target: { value: "Bruce Dickinson" },
    });
    fireEvent.change(secondOptionInput, { target: { value: "Iron Maiden" } });
    expect(firstOptionInput.value).toBe("Bruce Dickinson");
    expect(secondOptionInput.value).toBe("Iron Maiden");
  });
});
