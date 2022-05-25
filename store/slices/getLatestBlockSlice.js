import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {STATUS} from '~config/constants';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';



const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const latestKey = 'LatestBlock';

export const fetchLatestBlock = createAsyncThunk(
	`${latestKey}/fetch`,
	async () => {
		return await dataProvider.getOne(resources.latestBlock);
	}
);

export const getLatestBlockSlice = createSlice({
	name: latestKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchLatestBlock.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchLatestBlock.fulfilled]: (state, action) => {
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		},
		[fetchLatestBlock.rejected]: (state, action) => {
			state.status = STATUS.REJECTED;
			state.data = null;
			state.error = action.payload;
		},
	},
});

export const selectLatestBlock = (state) => state[latestKey];

export default getLatestBlockSlice.reducer;