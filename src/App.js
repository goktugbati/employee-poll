import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import {useEffect} from "react";
import {connect} from "react-redux";
import {handleInitialData} from "./actions/shared";

function App({dispatch, loggedIn}) {
    useEffect(() => {
        dispatch(handleInitialData());
    },[]);

    return (
    <div className="App">
      <Login/>
    </div>
  );
}

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);