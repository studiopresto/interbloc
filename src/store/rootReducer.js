import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, {transactionsKey} from './slices/getTransactionsSlice';
import getTransaction, {transactionKey} from './slices/getTransactionSlice';
import getBlocks, {blocksKey} from './slices/getBlocksSlice';
import getPrices, {pricesKey} from './slices/getPricesSlice';
import getLatestBlock, {latestKey} from './slices/getLatestBlockSlice';
import getBlock, {blockKey} from './slices/getBlockSlice';
import getBondingHistory, {bondingHistoryKey} from './slices/getBondingHistory';
import getTokenomics, {tokenomicsKey} from './slices/getTokenomicsSlice';
import getMempool, {mempoolKey} from './slices/getMempoolSlice';
import getConsensus, {consensusKey} from './slices/getConsensusSlice';
import getNodeLocations, {nodeLocationsKey} from './slices/getNodeLocationsSlice';
import getValidator, {validatorKey} from './slices/getValidatorSlice';
import getValidators, {validatorsKey} from './slices/getValidatorsSlice';
import getGovernanceProposals, {governanceProposalsKey} from "./slices/getGovernanceProposals";
import getGovernanceProposal, {governanceProposalKey} from "./slices/getGovernanceProposal";
import getAccount, {accountKey} from "./slices/getAccount";
import getPrice, {priceKey} from "./slices/getPrice";
import getTransactionsByAccount, {transactionsByAccountKey} from "./slices/getTransactionsByAccountSlice";
import getValidatorsAddressConversion, {validatorsAddressConversionKey} from "./slices/getValidatorsAddressConversion";
import getChainStats ,{chainStatsKey} from "./slices/getChainStats";


const rootReducer = combineReducers({
	[accountKey]: getAccount,
	[bondingHistoryKey]: getBondingHistory,
	[transactionsKey]: getTransactions,
	[transactionKey]: getTransaction,
	[transactionsByAccountKey]: getTransactionsByAccount,
	[blocksKey]: getBlocks,
	[blockKey]: getBlock,
	[chainStatsKey]: getChainStats,
	[governanceProposalsKey]: getGovernanceProposals,
	[governanceProposalKey]: getGovernanceProposal,
	[pricesKey]: getPrices,
	[latestKey]: getLatestBlock,
	[tokenomicsKey]: getTokenomics,
	[mempoolKey]: getMempool,
	[consensusKey]: getConsensus,
	[nodeLocationsKey]: getNodeLocations,
	[validatorKey]: getValidator,
	[validatorsKey]: getValidators,
	[validatorsAddressConversionKey]: getValidatorsAddressConversion,
	[priceKey]: getPrice,
});

export default rootReducer;
