import actions from './actions';

function wrappedTest(data) {
  return (dispatch, getState) => {
    dispatch(actions.test(data));
  };
}

export {
  wrappedTest,
}