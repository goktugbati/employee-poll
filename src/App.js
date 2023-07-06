import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import {useEffect} from "react";
import {connect} from "react-redux";
import {handleInitialData} from "./actions/shared";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

function App({dispatch, loggedIn}) {
    useEffect(() => {
        dispatch(handleInitialData());
    },[]);

    return (
        <div className="container mx-auto py-4">
            {loggedIn && <Nav/>}
            <Routes>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/questions/:id" element={<PrivateRoute><Login/></PrivateRoute>}/>
            </Routes>
        </div>
  );
}

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);