import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { STATUS } from '~config/constants';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';



const initialState = {
	data: null,
	status: STATUS.IDLE,
	error: null,
};

export const transactionsKey = 'Transactions';

export const fetchTransactions = createAsyncThunk(
	`${transactionsKey}/fetch`,
	async () => {
		return dataProvider.getList(resources.transactions);
	}
);

export const getTransactionsSlice = createSlice({
	name: transactionsKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTransactions.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
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