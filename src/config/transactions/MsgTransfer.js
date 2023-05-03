import {formatFromDenom} from 'utils/formatting/coins';
import routes from 'config/routes';

export const MsgTransferType = '/ibc.applications.transfer.v1.MsgTransfer';

export const ParseMsgTransfer = (data) => {
	const [amount, denom] = formatFromDenom(data.token.amount, data.token.denom);
	
	return {
		'title': 'Transfer',
		'sender': {
			title: data.sender,
			href: `${routes.public.account}/${data.sender}`,
			newTab: false
		},
		'receiver': {
			title: data.receiver,
		},
		'token': {
			title: `${amount} ${denom}`
		},
		'sourcePort': {
			title: data.sourcePort
		},
		'sourceChannel': {
			title: data.sourceChannel
		},
		'timeout': {
			title: new Date(data.timeoutTimestamp / 1000000).toLocaleDateString()
		}
	}
}