import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import PromiseMiddleware from 'redux-promise';
import rootReducer from './reducer';

export const store = createStore(rootReducer, compose(applyMiddleware(PromiseMiddleware, ReduxThunk),
   window.__REDUX_DEVTOOLS_EXTENSION__ &&
   window.__REDUX_DEVTOOLS_EXTENSION__()))