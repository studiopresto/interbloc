import {MsgSendType, ParseMsgSend} from './transactions/MsgSend';
import {MsgTransferType, ParseMsgTransfer} from './transactions/MsgTransfer';
import {MsgUndelegateType, ParseMsgUndelegate} from './transactions/MsgUndelegate';
import {MsgRecvPacketType, ParseMsgRecvPacket} from './transactions/MsgRecvPacket';

export const transactions = {
    [MsgSendType]: ParseMsgSend,
    [MsgTransferType]: ParseMsgTransfer,
    [MsgUndelegateType]: ParseMsgUndelegate,
    [MsgRecvPacketType]: ParseMsgRecvPacket
}

export const labels = {
    'from': 'From Address',
    'to': 'To Address',
    'amount': 'Amount',
    'sender': 'Sender',
    'receiver': 'Receiver',
    'token': 'Token',
    'timeout': 'Time out',
    'signer': 'Signer',
    'sourcePort': 'Source Port',
    'sourceChannel': 'Source Channel',
    'delegatorAddress': 'Delegator Address',
    'validatorAddress': 'Validator Address',
    'packetSequence': 'Packet sequence',
    'packetSourcePort': 'Packet source port',
    'packetSourceChannel': 'Packet source channel',
    'packetDestinationPort': 'Packet destination port',
    'packetDestinationChannel': 'Packet destination channel',
    'packetData': 'Packet Data',
    'packetTimeoutHeightRevisionNumber': 'Packet timeout height, revision number',
    'packetTimeoutHeightRevisionHeight': 'Packet timeout height, revision height',
    'proofCommitment': 'Proof commitment',
    'proofHeightRevisionNumber': 'Proof height, revision number',
    'proofHeightRevisionHeight': 'Proof height, revision height'
}