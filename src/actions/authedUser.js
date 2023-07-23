export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";

export function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  };
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  };
}

export function handleLogin(credentials) {
  return (dispatch, getState) => {
    const { users } = getState();

    const user = Object.values(users).find(
      (user) =>
        user.id === credentials.username &&
        user.password === credentials.password
    );

    if (!!user) {
      return dispatch(setAuthedUser(user));
    } else {
      return false;
    }
  };
}

export function handleLogout() {
  return (dispatch) => {
    return dispatch(logoutAuthedUser());
  };
}
