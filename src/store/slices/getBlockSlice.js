import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
    data: [],
    status: STATUS.IDLE,
    error: null,
};

export const blockKey = 'Block';

export const fetchBlock = createAsyncThunk(
    `${blockKey}/fetch`,
    async ({ blockSlug, include_transaction_data = false }) => {
        return await dataProvider.getOne(`${resources.block}/${blockSlug}`, { include_transaction_data } )
    }
);

export const getBlockSlice = createSlice({
    name: blockKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBlock.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchBlock.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = STATUS.FULFILLED;
        },
        [fetchBlock.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectBlock = (state) => state[blockKey];

export default getBlockSlice.reducer;
