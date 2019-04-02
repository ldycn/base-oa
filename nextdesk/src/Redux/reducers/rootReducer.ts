// import { combineReducers } from 'redux';

type action = {
  type: String,
  payload: any,
}

const rootReducer = function(state = { a: 1 }, { type, payload }: action) {
  return { a: state.a + 1 };
};

export default rootReducer;