import {
  UPDATE
} from "./action";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE:
      return action.value;
    default:
      return state;
  }
};

export default reducer;
