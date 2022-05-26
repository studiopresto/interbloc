import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, {transactionsKey} from './slices/getTransactionsSlice';
import getBlocks, {blocksKey} from '~store/slices/getBlocksSlice';
import getPrices, {pricesKey} from '~store/slices/getPricesSlice';
import getLatestBlock, {latestKey} from '~store/slices/getLatestBlockSlice';
import getTokenomics, {tokenomicsKey} from '~store/slices/getTokenomicsSlice';
import getMempool, {mempoolKey} from '~store/slices/getMempoolSlice';
import getConsensus, {consensusKey} from '~store/slices/getConsensusSlice';
import getNodeLocations, {nodeLocationsKey} from '~store/slices/getNodeLocationsSlice';


const rootReducer = combineReducers({
	[transactionsKey]: getTransactions,
	[blocksKey]: getBlocks,
	[pricesKey]: getPrices,
	[latestKey]: getLatestBlock,
	[tokenomicsKey]: getTokenomics,
	[mempoolKey]: getMempool,
	[consensusKey]: getConsensus,
	[nodeLocationsKey]: getNodeLocations,
});

export default rootReducer;