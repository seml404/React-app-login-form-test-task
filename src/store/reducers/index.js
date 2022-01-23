const initialState = {
  userEmail: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_EMAIL":
      return {
        ...state,
        userEmail: action.userEmail,
      };

    default:
      return state;
  }
};

export default reducer;
