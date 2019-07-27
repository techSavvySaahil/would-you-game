import {createStore} from "redux";
import reducer from "./ReducersActions/reducers";

const store = createStore(reducer, {
  answeredQuestions: {},
  loggedInUser: {},
  questions: {},
  unAnsweredQuestions: {},
  users: {}
});

export default store;
