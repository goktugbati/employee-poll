import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers";

const store = configureStore({ reducer });

describe("Login", () => {
  test("should render the component", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should display error message when username or password is not correct", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const usernameInputElement = screen
      .getByTestId("username")
      .querySelector("input");
    const passwordInputElement = screen
      .getByTestId("password")
      .querySelector("input");
    const submitButtonElement = screen.getByTestId("submit-button");

    fireEvent.change(usernameInputElement, {
      target: { value: "user" },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: "password" },
    });
    fireEvent.click(submitButtonElement);

    const errorMessageElement = screen.getByTestId("error-message");
    expect(errorMessageElement.textContent).toBe(
      "Invalid username or password"
    );
  });
});
