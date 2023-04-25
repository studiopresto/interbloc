import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const consensusKey = 'Consensus';

export const fetchConsensus = createAsyncThunk(
	`${consensusKey}/fetch`,
	async () => {
		return await dataProvider.getOne(resources.consensus);
	}
);

export const getConsensusSlice = createSlice({
	name: consensusKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchConsensus.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchConsensus.fulfilled]: (state, action) => {
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		},
		[fetchConsensus.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectConsensus = (state) => state[consensusKey];

export default getConsensusSlice.reducer;