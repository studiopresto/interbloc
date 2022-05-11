import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, { transactionsKey } from './slices/getBlocksSlice';


const rootReducer = combineReducers({
	[transactionsKey]: getTransactions,
});

export default rootReducer;