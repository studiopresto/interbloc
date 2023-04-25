import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
    data: {},
    status: STATUS.IDLE,
    error: null,
};

export const accountKey = 'Account';

export const fetchAccount = createAsyncThunk(
    `${accountKey}/fetch`,
    async ({ accountSlug }) => {
        return await dataProvider.getOne(`${resources.account}/${accountSlug}`, {  } )
    }
);

export const getAccountSlice = createSlice({
    name: accountKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAccount.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchAccount.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = STATUS.FULFILLED;
        },
        [fetchAccount.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectAccount = (state) => state[accountKey];

export default getAccountSlice.reducer;
