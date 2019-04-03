import actions from "../actions/actions";
import { Test, Test1 } from '../actions/types';

type Action = Test | Test1

const testReducer = function(state = { a: 1 }, action: Action) {
  switch (action.type) {
    case 'test':
      return { a: state.a + 1 };
    case 'test1':
      return { a: state.a + 2 };
    default:
      return state;
  }
};

export default testReducer;