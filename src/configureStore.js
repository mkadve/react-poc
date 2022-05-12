import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddlewares from 'redux-thunk';

import rootReducer from './container/Posts/reducer';

export default function configureStore(preloadedState) {
	const middlewares = [thunkMiddlewares];
	const middlewaresEnhancers = applyMiddleware(...middlewares);
	const enhanceres = [middlewaresEnhancers];
	const composeEnhancers = compose(...enhanceres);
	const store = createStore(rootReducer, preloadedState, composeEnhancers);
	return store;
}
