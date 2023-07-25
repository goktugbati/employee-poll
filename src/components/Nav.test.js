import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers";
import Nav from "./Nav";

const store = configureStore({
  reducer: reducer,
  preloadedState: {
    authedUser: {
      id: "tylermcginnis",
      password: "abc321",
      name: "Tyler McGinnis",
    },
    users: {
      tylermcginnis: {
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        password: "abc321",
        avatarURL:
          "https://pbs.twimg.com/profile_images/1428205319616798721/xmr7q976_400x400.jpg",
      },
    },
  },
});
describe("Navbar", () => {
  test("should render the component", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  test("should display username", () => {
    const view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    const userName = screen.getByTestId("username");
    expect(userName.textContent).toBe("Tyler McGinnis");
  });
});
