import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer,
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
