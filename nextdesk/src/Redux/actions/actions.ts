import { createActions } from 'redux-actions';

const actions = createActions(
  'test',
  'changeEnglish',
  'changeChinese',
);
console.log(actions)
export default actions;