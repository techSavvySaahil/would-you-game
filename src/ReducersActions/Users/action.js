const SET = "users/Set";
const UPDATE = "users/Update";

const updateUsers = (value) => {
  return {
    type: UPDATE,
    value
  }
};

const setUsers = (value) => {
  return {
    type: SET,
    value
  }
};

export {
  UPDATE,
  SET,
  updateUsers,
  setUsers
};
