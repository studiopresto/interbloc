import {MsgSendType, ParseMsgSend} from "~config/transactions/MsgSend";

export const transactions = {
    [MsgSendType]: ParseMsgSend
}

export const labels = {
    "from": "From Address",
    "to": "To Address",
    "amount": "Amount"
}
