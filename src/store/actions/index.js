const authoriseUser = (userToken) => {
  return {
    type: "USER_AUTHORISED",
    userToken,
  };
};

export { authoriseUser };
