import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { STATUS } from '~config/constants';

const initialState = {
	data: null,
	status: STATUS.IDLE,
	error: null,
};

export const transactionsKey = 'Transactions';

export const fetchTransactions = createAsyncThunk(
	`${transactionsKey}/fetch`,
	async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'GET',
		});

		return await response.json();
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
			console.log('action - ', action.payload);
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		}
	}
});

export const selectTransactions = (state) => state[transactionsKey];

export default getTransactionsSlice.reducer;