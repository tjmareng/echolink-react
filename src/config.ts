import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import loggerMiddleware from './middleware/logger';
import monitorReducerEnhancer from './enhancers/monitorReducer';
import thunkMiddleware from 'redux-thunk';

const reducer = createRootReducer();
const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(
  middlewareEnhancer,
  monitorReducerEnhancer
);

declare global {
    interface Window { devToolsExtension: any; }
}

const store = createStore(reducer,
  (window.devToolsExtension ? window.devToolsExtension() : f => f)
);

export default function configureStore(){
    return store;
  }