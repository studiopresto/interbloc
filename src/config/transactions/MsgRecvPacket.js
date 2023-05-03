import hashShortening from 'utils/string/hashShortening';
import routes from 'config/routes';

export const MsgRecvPacketType = '/ibc.core.channel.v1.MsgRecvPacket';

export const ParseMsgRecvPacket = (data) => {
	return {
		'title': 'Recv packet',
		'signer': {
			title: data.signer,
			href: `${routes.public.account}/${data.signer}`,
			newTab: false
		},
		'packetSequence': {
			title: data.packet.sequence
		},
		'packetSourcePort': {
			title: data.packet.sourcePort
		},
		'packetSourceChannel': {
			title: data.packet.sourceChannel
		},
		'packetDestinationPort': {
			title: data.packet.destinationPort
		},
		'packetDestinationChannel': {
			title: data.packet.destinationChannel
		},
		'packetData': {
			title: hashShortening(data.packet.data, 12)
		},
		'packetTimeoutHeightRevisionNumber': {
			title: data.packet.timeoutHeight.revisionNumber
		},
		'packetTimeoutHeightRevisionHeight': {
			title: data.packet.timeoutHeight.revisionHeight
		},
		'proofCommitment': {
			title: hashShortening(data.proofCommitment, 24)
		},
		'proofHeightRevisionNumber': {
			title: data.proofHeight.revisionNumber
		},
		'proofHeightRevisionHeight': {
			title: data.proofHeight.revisionHeight
		},
	}
}