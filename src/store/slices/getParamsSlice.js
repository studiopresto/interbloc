import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
    data: {},
    status: STATUS.IDLE,
    error: null,
};

export const paramsKey = 'Params';

export const fetchParams = createAsyncThunk(
    `${paramsKey}/fetch`,
    async () => {
        return await dataProvider.getOne(resources.tokenmics);
    }
);

export const getParamsSlice = createSlice({
    name: paramsKey,
    initialState,
    reducers: {},
    extraReducers: {
        [paramsKey.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [paramsKey.fulfilled]: (state, action) => {
            state.status = STATUS.FULFILLED;
            state.data = action.payload;
        },
        [paramsKey.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectParams = (state) => state[paramsKey];

export default getParamsSlice.reducer
