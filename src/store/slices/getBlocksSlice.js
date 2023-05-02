import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {QUERY_PARAMETERS, STATUS} from 'config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const blocksKey = 'Blocks';

export const fetchBlocks = createAsyncThunk(
	`${blocksKey}/fetch`,
	async (
		{
			limit = QUERY_PARAMETERS.LIMIT,
			per_page = QUERY_PARAMETERS.PARE_PAGE,
			page = 1
		}) => {
		return await dataProvider.getList(resources.latestBlock, { limit, per_page, page });
	}
);

export const getBlocksSlice = createSlice({
	name: blocksKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchBlocks.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchBlocks.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchBlocks.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectBlocks = (state) => state[blocksKey];

export default getBlocksSlice.reducer;
