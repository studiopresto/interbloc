import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
    data: {},
    status: STATUS.IDLE,
    error: null,
};

export const bondingHistoryKey = 'BondingHistory';

export const fetchBondingHistory = createAsyncThunk(
    `${bondingHistoryKey}/fetch`,
    async () => {
        return await dataProvider.getOne(resources.bondingHistory);
    }
);

export const getBondingHistorySlice = createSlice({
    name: bondingHistoryKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBondingHistory.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchBondingHistory.fulfilled]: (state, action) => {
            state.status = STATUS.FULFILLED;
            state.data = action.payload;
        },
        [fetchBondingHistory.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectBondingHistory = (state) => state[bondingHistoryKey];

export default getBondingHistorySlice.reducer;