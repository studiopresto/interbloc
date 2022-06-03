import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const transactionKey = 'Transaction';

export const fetchTransaction = createAsyncThunk(
	`${transactionKey}/fetch`,
	async ({ transactionSlug }) => {
		return await dataProvider.getOne(`${resources.transactions}/${transactionSlug}`);
	}
);

export const getTransactionSlice = createSlice({
	name: transactionKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTransaction.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchTransaction.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchTransaction.rejected]: (state, action) => {
			state.status =  STATUS.REJECTED;
			state.data = null;
			state.error = action.payload;
		},
	},
});


export const selectTransaction = (state) => state[transactionKey];

export default getTransactionSlice.reducer;