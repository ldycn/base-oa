import actions from './actions';

function wrappedTest(data: any) {
  return (dispatch: any) => {
    dispatch(actions.test(data));
  };
}

export {
  wrappedTest,
}