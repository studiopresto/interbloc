import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';
import coinConfig from '../../../coin.config';
import {getFromLocalStorageWithExpiry, setToLocalStorageWithExpiry} from 'utils/localStorage/expiryLocalStorage';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const priceKey = 'Price';

const fetchPrice = createAsyncThunk(
	`${priceKey}/fetch`,
	async ({priceSlug}) => {
		// check localStorage
		const dataFromLocalStorage = getFromLocalStorageWithExpiry(priceKey);
		if (dataFromLocalStorage) {
			return dataFromLocalStorage;
		} else {
		 // get data from API
		 const data = await dataProvider.getOne(`${resources.price}`, {ids: coinConfig.coingeckoID, vs_currencies: 'usd'});
		 // save data to localStorage
		 await setToLocalStorageWithExpiry(priceKey, data);
		 // return data from API
		 return data
    }
	}
);

export const getPriceSlice = createSlice({
	name: priceKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPrice.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchPrice.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchPrice.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectPrice = (state) => state[priceKey];

export default getPriceSlice.reducer;
