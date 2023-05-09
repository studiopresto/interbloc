import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';
import {QUERY_PARAMETERS, STATUS} from 'config/constants';

const initialState = {
	data: [],
	order: {
		direction: 'proposalId',
		by: 'asc'
	},
	status: STATUS.IDLE,
	error: null,
};

export const governanceProposalsKey = 'GovernanceProposals';

export const fetchGovernanceProposals = createAsyncThunk(
	`${governanceProposalsKey}/fetch`,
	async (
		{
			limit = QUERY_PARAMETERS.LIMIT,
			per_page = QUERY_PARAMETERS.PARE_PAGE,
			page = 1,
			order_by,
			order_direction
		}) => {
		return await dataProvider.getOne(resources.governanceProposals, {
			limit,
			per_page,
			page,
			order_by,
			order_direction
		}).then(response => {
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
			state.order.direction = action.meta.arg.order_direction;
			state.order.by = action.meta.arg.order_by;
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
