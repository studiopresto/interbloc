import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';
import coinConfig from "../../coin.config";
const initialState = {
    data: {},
    status: STATUS.IDLE,
    error: null,
};

export const priceKey = 'Price';

const fetchPrice = createAsyncThunk(
    `${priceKey}/fetch`,
    async ({ priceSlug }) => {
        return await dataProvider.getOne(`${resources.price}`, { ids: coinConfig.coingeckoID, vs_currencies: 'usd' } )
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
