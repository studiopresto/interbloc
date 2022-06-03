import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
	data: [],
	status: STATUS.IDLE,
	error: null,
};

export const blocksKey = 'Blocks';

export const fetchBlocks = createAsyncThunk(
	`${blocksKey}/fetch`,
	async ({ items_per_page = 10, page = 1 }) => {
		return await dataProvider.getList(resources.blocks, { items_per_page, page })
			.then(response => {
				let data = [];
				Object.keys(response).forEach(block => {
					data.push(response[block]);
				});
				return data;
			});
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