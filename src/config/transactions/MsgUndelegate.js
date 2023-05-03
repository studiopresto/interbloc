import {formatFromDenom} from 'utils/formatting/coins';
import routes from 'config/routes';

export const MsgUndelegateType = '/cosmos.staking.v1beta1.MsgUndelegate';

export const ParseMsgUndelegate = (data) => {
	const [amount, denom] = formatFromDenom(data.amount.amount, data.amount.denom);
	
	return {
		'title': 'Undelegate',
		'delegatorAddress': {
			title: data.delegatorAddress,
			href: `${routes.public.account}/${data.delegatorAddress}`,
			newTab: false
		},
		'validatorAddress': {
			title: data.validatorAddress,
		},
		'amount': {
			title: `${amount} ${denom}`
		},
	}
}