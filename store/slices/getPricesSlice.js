import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import { STATUS } from '~config/constants';



const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
}

export const pricesKey = 'Prices';

export const fetchPrices = createAsyncThunk(
	`${pricesKey}/fetch`,
	async () => {
		return await dataProvider.getList(resources.prices, { vs_currency: 'usd', days: 7 }, true)
			.then(res => {
				const prices = res?.prices;
				const marketCaps = res?.market_caps;
				const totalVolumes = res?.total_volumes;
				const price = [];
				const date = [];
				const marketCapsArray = [];
				const totalVolumesArray = [];
				for (let i = 0; i < prices.length; i++) {
					let priceValue = prices[i][1];
					price.push(parseFloat(priceValue.toFixed(2)));
					date.push(new Date(prices[i][0]));
					marketCapsArray.push(marketCaps[i][1]);
					totalVolumesArray.push(totalVolumes[i][1]);
				}
				return { price, date, market_caps: marketCapsArray, total_volumes: totalVolumesArray };
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
		[fetchPrices.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	}
});

export const selectPrices = (state) => state[pricesKey];

export default getPricesSlice.reducer;