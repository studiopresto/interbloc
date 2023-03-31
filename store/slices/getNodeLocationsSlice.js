import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const nodeLocationsKey = 'NodeLocations';

export const fetchNodeLocations = createAsyncThunk(
	`${nodeLocationsKey}/fetch`,
	async () => {
		return await dataProvider.getOne(resources.nodes)
			.then(res => {
				const location = res?.countries;
				const values = [];
				const labels = [];

				Object.keys(location).forEach(loc => {
					values.push(location[loc]);
					labels.push(loc);
				});

				return {...res, locationLabels: labels, locationValues: values};
			});
	}
);

export const getNodeLocationsSlice = createSlice({
	name: nodeLocationsKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchNodeLocations.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchNodeLocations.fulfilled]: (state, action) => {
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		},
		[fetchNodeLocations.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectNodeLocations = (state) => state[nodeLocationsKey];

export default getNodeLocationsSlice.reducer;
