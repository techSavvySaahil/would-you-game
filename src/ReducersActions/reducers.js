import {combineReducers} from "redux";
import answeredQuestions from "./Answered/reducer";
import unAnsweredQuestions from "./Unanswered/reducer";
import users from "./Users/reducer";
import questions from "./Questions/reducer";
import loggedInUser from "./LoggedInUser/reducer";

const reducer = combineReducers({
  answeredQuestions,
  loggedInUser,
  questions,
  unAnsweredQuestions,
  users
});

export default reducer;
