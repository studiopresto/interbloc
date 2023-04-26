import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import { STATUS } from 'config/constants';



const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const transactionsByAccountKey = 'TransactionsByAccount';

export const fetchTransactionsByAccount = createAsyncThunk(
	`${transactionsByAccountKey}/fetch`,
	async ({ addressSlug,  limit = 10, per_page = 10, page = 1 }) => {
		return await dataProvider.getList(`${resources.transactionsByAccount}/${addressSlug}`, { limit, per_page, page })

	}
);

export const getTransactionsByAccountSlice = createSlice({
	name: transactionsByAccountKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTransactionsByAccount.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
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