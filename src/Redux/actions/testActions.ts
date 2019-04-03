import actions from './actions';

function test(data: string) {
  return (dispatch: any) => {
    dispatch(actions.test(data));
  };
}

export {
  test,
}