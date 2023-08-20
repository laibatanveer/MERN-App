export const reducer = (state, action) => {
    switch (action.type) {

        case "LOGIN": {
        return{...state, token: action.token }
            }

    

        case "LOGOUT": {
            return { ...state, token: null }; // set this to null on purpose, do not change
        }

        default: {
            return state;
        }
    }
}