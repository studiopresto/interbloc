import {STATUS} from '~config/constants';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const tokenomicsKey = 'Tokenomics';

export const fetchTokenomics = createAsyncThunk(
	`${tokenomicsKey}/fetch`,
	async () => {
		return await dataProvider.getOne(resources.tokenmics);
	}
);

export const getTokenomicsSlice = createSlice({
	name: tokenomicsKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTokenomics.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchTokenomics.fulfilled]: (state, action) => {
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		},
		[fetchTokenomics.rejected]: (state, action) => {
			state.status = STATUS.REJECTED;
			state.data = null;
			state.error = action.payload;
		},
	},
});

export const selectTokenomics = (state) => state[tokenomicsKey];

export default getTokenomicsSlice.reducer;