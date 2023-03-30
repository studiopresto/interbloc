import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
    data: [],
    status: STATUS.IDLE,
    error: null,
};

export const validatorsAddressConversionKey = 'ValidatorsAddressConversion';

export const fetchValidatorsAddressConversion = createAsyncThunk(
    `${validatorsAddressConversionKey}/fetch`,
    async ({ height = 0}) => {
        return await dataProvider.getOne(`${resources.validatorsAddressConversion}`, { height } );
    }
);

export const getValidatorsAddressConversionSlice = createSlice({
    name: validatorsAddressConversionKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchValidatorsAddressConversion.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchValidatorsAddressConversion.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = STATUS.FULFILLED;
        },
        [fetchValidatorsAddressConversion.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectValidatorsAddressConversion = (state) => state[validatorsAddressConversionKey];

export default getValidatorsAddressConversionSlice.reducer;
