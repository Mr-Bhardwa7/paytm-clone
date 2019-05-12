import UserReducer from './UserReducer';
import TransactionReducer from './TransactionReducer';
import { combineReducers } from 'redux';

export default combineReducers({
	users 		: UserReducer,
	transactions : TransactionReducer,
})