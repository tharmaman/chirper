import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,     // true when logged in
    user: {}    // all the user info once logged in
};

export default ( state = DEFAULT_STATE, action ) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                // not not
                // converts into boolean
                // turn empty object into false or if there are keys true
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default:
            return state;
    }
};