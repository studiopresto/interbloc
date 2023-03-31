import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from '~utils/requestProviders/dataProvider';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';

const initialState = {
    data: [],
    status: STATUS.IDLE,
    error: null,
};

export const governanceProposalsKey = 'GovernanceProposals';

export const fetchGovernanceProposals = createAsyncThunk(
    `${governanceProposalsKey}/fetch`,
    async ({ limit = 10, per_page = 10, page = 1 }) => {
        return await dataProvider.getOne(resources.governanceProposals, { limit, per_page, page })
            .then(response => {
                let proposals = [];
                Object.keys(response.proposals).forEach(proposal => {
                    proposals.push(response.proposals[proposal]);
                });
                return {
                    proposals,
                    pagination: response.pagination
                };
            });
    }
);

export const getGovernanceProposalsSlice = createSlice({
    name: governanceProposalsKey,
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGovernanceProposals.pending]: (state) => {
            state.status = STATUS.PENDING;
        },
        [fetchGovernanceProposals.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.status = STATUS.FULFILLED;
        },
        [fetchGovernanceProposals.rejected]: (state, action) => {
            state.data = null;
            state.error = action.payload;
            state.status = STATUS.REJECTED;
        },
    },
});

export const selectGovernanceProposals = (state) => state[governanceProposalsKey];

export default getGovernanceProposalsSlice.reducer;
