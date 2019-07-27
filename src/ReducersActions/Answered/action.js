const SET = "answeredQuestions/Set";

const UPDATE = "answeredQuestions/Update";

const updateAnsweredQuestions = (value) => {
  return {
    type: UPDATE,
    value
  }
};

const setAnsweredQuestions = (value) => {
  return {
    type: SET,
    value
  }
};

export {
  SET,
  UPDATE,
  updateAnsweredQuestions,
  setAnsweredQuestions
};
