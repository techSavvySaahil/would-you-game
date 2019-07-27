const UPDATE = "unansweredQuestions/Update";

const SET =  "unansweredQuestions/Set";

const updateUnansweredQuestions = (value) => {
  return {
    type: UPDATE,
    value
  }
};

const setUnansweredQuestions = (value) => {
  return {
    type: SET,
    value
  }
};

export {
  UPDATE,
  SET,
  updateUnansweredQuestions,
  setUnansweredQuestions
};
