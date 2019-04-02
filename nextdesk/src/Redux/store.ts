import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/***
 * 加载所有 redux 变量
 */
const store = createStore(rootReducer, undefined,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
export default store;
