import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import PromiseMiddleware from 'redux-promise';
import newRootReducer from './reducer';

export const store = createStore(newRootReducer, compose(applyMiddleware(PromiseMiddleware, ReduxThunk)))