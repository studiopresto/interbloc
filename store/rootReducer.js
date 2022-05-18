import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, { transactionsKey } from './slices/getTransactionsSlice';
import getPrices, { pricesKey } from '~store/slices/getPricesSlice';



const rootReducer = combineReducers({
	[transactionsKey]: getTransactions,
	[pricesKey]: getPrices,
});

export default rootReducer;