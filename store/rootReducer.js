import { combineReducers } from '@reduxjs/toolkit';
import getTransactions, {transactionsKey} from './slices/getTransactionsSlice';
import getTransaction, {transactionKey} from './slices/getTransactionSlice';
import getBlocks, {blocksKey} from '~store/slices/getBlocksSlice';
import getPrices, {pricesKey} from '~store/slices/getPricesSlice';
import getLatestBlock, {latestKey} from '~store/slices/getLatestBlockSlice';
import getBlock, {blockKey} from '~store/slices/getBlockSlice';
import getBondingHistory, {bondingHistoryKey} from '~store/slices/getBondingHistory';
import getTokenomics, {tokenomicsKey} from '~store/slices/getTokenomicsSlice';
import getMempool, {mempoolKey} from '~store/slices/getMempoolSlice';
import getConsensus, {consensusKey} from '~store/slices/getConsensusSlice';
import getNodeLocations, {nodeLocationsKey} from '~store/slices/getNodeLocationsSlice';
import getValidator, {validatorKey} from '~store/slices/getValidatorSlice';
import getValidators, {validatorsKey} from '~store/slices/getValidatorsSlice';
import getGovernanceProposals, {governanceProposalsKey} from "~store/slices/getGovernanceProposals";
import getGovernanceProposal, {governanceProposalKey} from "~store/slices/getGovernanceProposal";
import getAccount, {accountKey} from "~store/slices/getAccount";
import getPrice, {priceKey} from "~store/slices/getPrice";
import getTransactionsByAccount, {transactionsByAccountKey} from "~store/slices/getTransactionsByAccountSlice";
import getValidatorsAddressConversion, {validatorsAddressConversionKey} from "~store/slices/getValidatorsAddressConversion";
import getChainStats ,{chainStatsKey} from "~store/slices/getChainStats";


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
