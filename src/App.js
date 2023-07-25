import "./App.css";
import Login from "./components/Login";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { handleInitialData } from "./actions/shared";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import LeaderBoard from "./components/LeaderBoard";
import Poll from "./components/Poll";
import NewPoll from "./components/NewPoll";
import Error404 from "./components/Error404";

function App() {
  const loggedIn = useSelector((state) => !!state.authedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="container mx-auto py-4">
      {loggedIn && <Nav />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <Poll />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <LeaderBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
