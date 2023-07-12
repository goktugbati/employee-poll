import React from 'react';
import {connect} from "react-redux";

const Question = ({question}) => {
    return (
        <div>

        </div>
    );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Question);