import {formatFromDenom} from 'utils/formatting/coins';

export const MsgTransferType = '/ibc.applications.transfer.v1.MsgTransfer';

export const ParseMsgTransfer = (data) => {
	const [amount, denom] = formatFromDenom(data.token.amount, data.token.denom);
	
	return {
		'title': 'Transfer',
		'sender': data.sender,
		'receiver': data.receiver,
		'token': `${amount} ${denom}`,
		'sourcePort': data.sourcePort,
		'sourceChannel': data.sourceChannel,
		'timeout': new Date(data.timeoutTimestamp / 1000000).toLocaleDateString()
	}
}