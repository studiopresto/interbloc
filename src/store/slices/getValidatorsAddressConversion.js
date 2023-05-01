import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';
import {
	getFromLocalStorageWithExpiry,
	setToLocalStorageWithExpiry
} from 'utils/localStorage/expiryLocalStorage';

const initialState = {
	data: [],
	status: STATUS.IDLE,
	error: null,
};

export const validatorsAddressConversionKey = 'ValidatorsAddressConversion';

export const fetchValidatorsAddressConversion = createAsyncThunk(
	`${validatorsAddressConversionKey}/fetch`,
	async ({height = 0}) => {
		// check localStorage
		const dataFromLocalStorage = getFromLocalStorageWithExpiry(validatorsAddressConversionKey);
		if (dataFromLocalStorage) {
			// return data from localStorage, if expiry and data exist
			return dataFromLocalStorage;
		} else {
			// get data from API
			const data = await dataProvider.getOne(`${resources.validatorsAddressConversion}`, {height});
			// save data to localStorage
			await setToLocalStorageWithExpiry(validatorsAddressConversionKey, data);
			// return data from API
			return data;
		}
	}
);

export const getValidatorsAddressConversionSlice = createSlice({
	name: validatorsAddressConversionKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchValidatorsAddressConversion.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchValidatorsAddressConversion.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchValidatorsAddressConversion.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectValidatorsAddressConversion = (state) => state[validatorsAddressConversionKey];

export default getValidatorsAddressConversionSlice.reducer;
