import hashShortening from 'utils/string/hashShortening';

export const MsgRecvPacketType = '/ibc.core.channel.v1.MsgRecvPacket';

export const ParseMsgRecvPacket = (data) => {
	return {
		'title': 'Recv packet',
		'signer': data.signer,
		'packetSequence': data.packet.sequence,
		'packetSourcePort': data.packet.sourcePort,
		'packetSourceChannel': data.packet.sourceChannel,
		'packetDestinationPort': data.packet.destinationPort,
		'packetDestinationChannel': data.packet.destinationChannel,
		'packetData': hashShortening(data.packet.data, 12),
		'packetTimeoutHeightRevisionNumber': data.packet.timeoutHeight.revisionNumber,
		'packetTimeoutHeightRevisionHeight': data.packet.timeoutHeight.revisionHeight,
		'proofCommitment': hashShortening(data.proofCommitment, 24),
		'proofHeightRevisionNumber': data.proofHeight.revisionNumber,
		'proofHeightRevisionHeight': data.proofHeight.revisionHeight,
	}
}