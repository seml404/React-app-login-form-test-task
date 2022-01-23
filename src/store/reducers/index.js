const initialState = {
  userAuthorised: false,
  userToken: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_AUTHORISED":
      if (action.userToken) {
        return {
          ...state,
          userAuthorised: true,
          userToken: action.userToken,
        };
      } else {
        return {
          ...state,
          userAuthorised: true,
        };
      }
    default:
      return state;
  }
};

export default reducer;
