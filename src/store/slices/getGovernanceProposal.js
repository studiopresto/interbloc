import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {STATUS} from 'config/constants';

const initialState = {
    data: [],
    status: STATUS.IDLE,
    error: null,
};

export const governanceProposalKey = 'GovernanceProposal';

export const fetchGovernanceProposal = createAsyncThunk(
    `${governanceProposalKey}/fetch`,
    async ({ proposalSlug, target_language }) => {
        return await dataProvider.getList(`${resources.governanceProposal}/${proposalSlug}`, {
            target_language
        })
    }
);

export const getGovernanceProposalSlice = createSlice({
    name: governanceProposalKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGovernanceProposal.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchGovernanceProposal.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = STATUS.FULFILLED;
        },
        [fetchGovernanceProposal.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectGovernanceProposal = (state) => state[governanceProposalKey];

export default getGovernanceProposalSlice.reducer;
