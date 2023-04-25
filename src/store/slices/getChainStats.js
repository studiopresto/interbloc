import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
    data: {},
    status: STATUS.IDLE,
    error: null,
};

export const chainStatsKey = 'ChainStats';

export const fetchChainStats = createAsyncThunk(
    `${chainStatsKey}/fetch`,
    async () => {
        return await dataProvider.getOne(resources.chainStats);
    }
);

export const getChainStatsSlice = createSlice({
    name: chainStatsKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchChainStats.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchChainStats.fulfilled]: (state, action) => {
            state.status = STATUS.FULFILLED;
            state.data = action.payload;
        },
        [fetchChainStats.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectChainStats = (state) => state[chainStatsKey];

export default getChainStatsSlice.reducer;