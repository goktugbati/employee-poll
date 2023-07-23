import { SET_AUTHED_USER, LOGOUT_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      console.log("setting authed user to", action.authedUser);
      return action.authedUser;
    case LOGOUT_AUTHED_USER:
      return null;
    default:
      return state;
  }
}
