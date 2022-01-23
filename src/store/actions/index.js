const setUserEmail = (userEmail) => {
  return {
    type: "SET_USER_EMAIL",
    userEmail,
  };
};

export { setUserEmail };
