import logger from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

const Store = createStore(
		rootReducer, 
		applyMiddleware(thunk,logger)
	);

export default Store;