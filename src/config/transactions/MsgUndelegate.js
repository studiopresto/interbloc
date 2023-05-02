import {formatFromDenom} from '../../utils/formatting/coins';

export const MsgUndelegateType = '/cosmos.staking.v1beta1.MsgUndelegate';

export const ParseMsgUndelegate = (data) => {
	const [amount, denom] = formatFromDenom(data.amount.amount, data.amount.denom);
	
	return {
		'title': 'Undelegate',
		'delegatorAddress': data.delegatorAddress,
		'validatorAddress': data.validatorAddress,
		'amount': `${amount} ${denom}`,
	}
}