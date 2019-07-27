const UPDATE = "loggedInUser/Update";

const updateLoggedInUser = (value) => {
  return {
    type: UPDATE,
    value
  }
};

export {
  UPDATE,
  updateLoggedInUser
};
