export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, token: action.token };
    }

    case "LOGOUT": {
      return { ...state, token: null };
    }
    case "SET_TOKEN": {
      return { ...state, token: action.payload };
    }

    default: {
      return state;
    }
  }
};
