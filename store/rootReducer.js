import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, { transactionsKey } from './slices/getTransactionsSlice';
import getPrices, { pricesKey } from '~store/slices/getPricesSlice';
import getLatestBlock, {latestKey} from '~store/slices/getLatestBlockSlice';
import getTokenomics, {tokenomicsKey} from '~store/slices/getTokenomicsSlice';
import getMempool, {mempoolKey} from '~store/slices/getMempoolSlice';


const rootReducer = combineReducers({
	[transactionsKey]: getTransactions,
	[pricesKey]: getPrices,
	[latestKey]: getLatestBlock,
	[tokenomicsKey]: getTokenomics,
	[mempoolKey]: getMempool,
});

export default rootReducer;