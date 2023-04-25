import {formatFromDenom} from "../../utils/formatting/coins";

export const MsgSendType = "/cosmos.bank.v1beta1.MsgSend";

export const ParseMsgSend = (data) => {
    const [amount, denom] = formatFromDenom(data.amount[0].amount, data.amount[0].denom)
    return {
        "title": "Send",
        "from": data.fromAddress,
        "to": data.toAddress,
        "amount": amount + ' ' + denom
    }
    return [
        "Send",
        [
            ['From Address', data.fromAddress],
            ['To Address', data.toAddress],
            ['Amount', amount + ' ' + denom ],
        ]
    ];
}
