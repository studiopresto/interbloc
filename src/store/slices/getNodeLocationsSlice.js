import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';
import {getFromLocalStorageWithExpiry, setToLocalStorageWithExpiry} from 'utils/localStorage/expiryLocalStorage';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const nodeLocationsKey = 'NodeLocations';

export const fetchNodeLocations = createAsyncThunk(
	`${nodeLocationsKey}/fetch`,
	async () => {
		// check localStorage
		const dataFromLocalStorage = getFromLocalStorageWithExpiry(nodeLocationsKey);
		if (dataFromLocalStorage) {
			// return data from localStorage, if expiry and data exist
			return dataFromLocalStorage;
		} else {
			// get data from API
			const data = await dataProvider.getOne(resources.nodes)
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
			// save data to localStorage
			await setToLocalStorageWithExpiry(nodeLocationsKey, data);
			// rerun data from API
			return data;
		}
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
