import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const mempoolKey = 'Mempool';

export const fetchMempool = createAsyncThunk(
	`${mempoolKey}/fetch`,
	async () => {
		return await dataProvider.getOne(resources.mempool)
			.then(res => {
				let fees = res?.fees;
				let feesValues = [];
				let feesNumeric = [];
				Object.keys(fees).forEach(el => {
					feesValues.push(fees[el]);
					feesNumeric.push(el);
				});
				return { ...res, feesValues, feesNumeric };
			});
	}
);

export const getMempoolSlice = createSlice({
	name: mempoolKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchMempool.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchMempool.fulfilled]: (state, action) => {
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		},
		[fetchMempool.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectMempool = (state) => state[mempoolKey];

export default getMempoolSlice.reducer;