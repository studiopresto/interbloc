import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, { transactionsKey } from './slices/getTransactionsSlice';


const rootReducer = combineReducers({
	[transactionsKey]: getTransactions,
});

export default rootReducer;