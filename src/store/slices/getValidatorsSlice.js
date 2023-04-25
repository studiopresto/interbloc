import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
    data: [],
    status: STATUS.IDLE,
    error: null,
};

export const validatorsKey = 'Validators';

export const fetchValidators = createAsyncThunk(
    `${validatorsKey}/fetch`,
    async ({ per_page = 0, skip = 0,  include_jailed = true, status = "BOND_STATUS_BONDED"}) => {
        return await dataProvider.getList(`${resources.validators}`, { per_page, skip, include_jailed, status } ).then(response => {
            let data = [];
            Object.keys(response).forEach(block => {
                data.push(response[block]);
            });
            return data;
        });
    }
);

export const getValidatorsSlice = createSlice({
    name: validatorsKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchValidators.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchValidators.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = STATUS.FULFILLED;
        },
        [fetchValidators.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectValidators = (state) => state[validatorsKey];

export default getValidatorsSlice.reducer;
