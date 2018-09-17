import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            // always remember it should be "post" not "POST"
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token);
                    dispatch(setCurrentUser(user));
                    resolve();  // indicate that the API call succeeded
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();   // indicate the API call failed
                });
        });
    };
}