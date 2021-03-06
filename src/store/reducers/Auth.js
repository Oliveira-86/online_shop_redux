import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/Auth";

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            }
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            };
        // case SIGN_UP:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            }
        default:
            return state;
    };
};