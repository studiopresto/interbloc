import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {QUERY_PARAMETERS, STATUS} from 'config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const transactionsKey = 'Transactions';

export const fetchTransactions = createAsyncThunk(
	`${transactionsKey}/fetch`,
	async (
		{
			limit = QUERY_PARAMETERS.LIMIT,
			per_page = QUERY_PARAMETERS.PARE_PAGE,
			page = 1,
			order_by,
			order_direction
		}) => {
		return await dataProvider.getList(resources.latestTransactions,
			{
				limit,
				per_page,
				page,
				order_by,
				order_direction
			})
	}
);

export const getTransactionsSlice = createSlice({
	name: transactionsKey,
	initialState,
	reducers: {},
	extraReducers: {
		// [fetchTransactions.pending]: (state) => {
		// 	state.status = STATUS.PENDING;
		// },
		[fetchTransactions.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchTransactions.rejected]: (state, action) => {
			state.status = STATUS.REJECTED;
			state.data = null;
			state.error = action.payload;
		}
	}
});

export const selectTransactions = (state) => state[transactionsKey];

export default getTransactionsSlice.reducer;
