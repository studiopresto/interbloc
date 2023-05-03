import routes from 'config/routes';
import {getDateFromTimestamp} from 'utils/date/getDateFromTimestamp';
import {formatCoinArrayToString, formatCoinsFromBaseDenom} from 'utils/formatting/coins';

export const extractProposalData = (data, totalVote, t) => {

	return [
		{
			label: t('labels:proposer'),
			value: {
				title: data.proposer,
				href: `${routes.public.account}/${data.proposer}`
			}
		},
		{
			label: t('labels:type'),
			value: {
				title: data.content.type
			}
		},
		{
			label: t('labels:submitted'),
			value: {
				title: getDateFromTimestamp(data.submitTime * 1000)
			}
		},
		{
			label: t('labels:deposit-end-time'),
			value: {
				title: getDateFromTimestamp(data.depositEndTime * 1000)
			}
		},
		{
			label: t('labels:voting-start'),
			value: {
				title: getDateFromTimestamp(data.votingStartTime * 1000)
			}
		},
		{
			label: t('labels:voting-end'),
			value: {
				title: getDateFromTimestamp(data.votingEndTime * 1000)
			}
		},
		{
			label: t('labels:total-deposit'),
			value: {
				title: formatCoinArrayToString(data.totalDeposit)
			}
		},
		{
			label: t('labels:votes'),
			value: {
				title: formatCoinsFromBaseDenom(totalVote).value + ' ' + formatCoinsFromBaseDenom(totalVote).suffix
			}
		}
	]
}