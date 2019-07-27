const UPDATE = "questions/Update";

const SET = "questions/Set";

const updateQuestions = (value) => {
  return {
    type: UPDATE,
    value
  }
};

const setQuestions = (value) => {
  return {
    type: SET,
    value
  }
};

export {
  UPDATE,
  SET,
  updateQuestions,
  setQuestions
};
