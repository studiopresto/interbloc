import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { STATUS } from '~config/constants';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from "~utils/requestProviders/resources";



const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
}

export const pricesKey = 'Prices';

export const fetchPrices = createAsyncThunk(
	`${pricesKey}/fetch`,
	async () => {
		return dataProvider.getList(resources.prices, { vs_currency: 'usd', days: 7 }, true)
			.then(res => {
				const prices = res?.prices;
				const price = [];
				const date = [];
				for (let i = 0; i < prices.length; i++) {
					price.push(prices[i][1]);
					// date.push(prices[i][0]);
					date.push(new Date(prices[i][0]));
				}
				return { price, date };
			})
	}
);

export const getPricesSlice = createSlice({
	name: pricesKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPrices.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchPrices.fulfilled]: (state, action) => {
			state.status = STATUS.FULFILLED;
			state.data = action.payload;
		},
		[fetchPrices.rejected]: (state) => {
			state.status = STATUS.REJECTED;
		},
	}
});

export const selectPrices = (state) => state[pricesKey];

export default getPricesSlice.reducer;