import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {QUERY_PARAMETERS, STATUS} from 'config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const transactionsByAccountKey = 'TransactionsByAccount';

export const fetchTransactionsByAccount = createAsyncThunk(
	`${transactionsByAccountKey}/fetch`,
	async (
		{
			addressSlug,
			limit = QUERY_PARAMETERS.LIMIT,
			per_page = QUERY_PARAMETERS.PARE_PAGE,
			page = 1,
			order_by,
			order_direction
		}) => {
		return await dataProvider.getList(`${resources.transactionsByAccount}/${addressSlug}`,
			{
				limit,
				per_page,
				page,
				order_by,
				order_direction
			})
	}
);

export const getTransactionsByAccountSlice = createSlice({
	name: transactionsByAccountKey,
	initialState,
	reducers: {},
	extraReducers: {
		// [fetchTransactionsByAccount.pending]: (state) => {
		// 	state.status = STATUS.PENDING;
		// },
		[fetchTransactionsByAccount.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchTransactionsByAccount.rejected]: (state, action) => {
			state.status = STATUS.REJECTED;
			state.data = null;
			state.error = action.payload;
		}
	}
});

export const selectTransactionsByAccount = (state) => state[transactionsByAccountKey];

export default getTransactionsByAccountSlice.reducer;
