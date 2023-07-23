import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";
import {getInitialData} from "../util/api";

export function handleInitialData() {
    return async (dispatch) => {
        const { users, questions } = await getInitialData();
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
    };
}