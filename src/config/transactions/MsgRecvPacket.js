export const MsgRecvPacketType = '/ibc.core.channel.v1.MsgRecvPacket';

export const ParseMsgRecvPacket = (data) => {
	return {
		'title': 'Recv packet',
		'signer': data.signer,
		'packetSequence': data.packet.sequence,
		'packetSourcePort': data.packet.sourcePort,
		'packetSourceChannel': data.packet.sourceChannel,
		'packetDestinationPort': data.packet.destinationPort
	}
}