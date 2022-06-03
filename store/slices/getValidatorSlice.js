import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import resources from '~utils/requestProviders/resources';
import {STATUS} from '~config/constants';
import dataProvider from '~utils/requestProviders/dataProvider';

const initialState = {
	data: {},
	status: STATUS.IDLE,
	error: null,
};

export const validatorKey = 'Validator';

export const fetchValidator = createAsyncThunk(
	`${validatorKey}/fetch`,
	async ({ validatorSlug }) => {
		return await dataProvider.getOne(`${resources.validator}/${validatorSlug}`)
			.then(res => {
				const historic = {
					rank: [],
					voting_power: [],
					dates: [],
				};
				const rank = res?.historic_rank;
				const votingPower = res?.historic_voting_power;
				const uptime = res?.uptime;
				const uptimeArray = [];
				Object.keys(rank).forEach((el, i) => {
					historic.dates.push(i);
					historic.rank.push(rank[el]);
					historic.voting_power.push(votingPower[el]);
				});
				for (let i = 0; i < uptime.length; i++) {
					Object.keys(uptime[i]).forEach((el) => {
						uptimeArray.push(uptime[i][el]);
					});
				}
				return {...res, historic, uptimeArray};
			});
	}
);

export const getValidatorSlice = createSlice({
	name: validatorKey,
	initialState,
	reducers: {},
	extraReducers: {
		[fetchValidator.pending]: (state) => {
			state.status = STATUS.PENDING;
		},
		[fetchValidator.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = STATUS.FULFILLED;
		},
		[fetchValidator.rejected]: (state, action) => {
			state.data = null;
			state.error = action.payload;
			state.status = STATUS.REJECTED;
		},
	},
});

export const selectValidator = (state) => state[validatorKey];

export default getValidatorSlice.reducer;