import actions from "../actions/actions";
import { combineReducers } from 'redux';
import testReducer from './testRducer';

const rootReducer = combineReducers({
  test: testReducer,
});

export default rootReducer;