import {
  SET,
  UPDATE,
} from "./action";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET:
      return action.value;
    case UPDATE:
      const {
        id,
        object
      } = action.value;
      state[id] = object;
      return state;
    default:
      return state;
  }
};

export default reducer;
