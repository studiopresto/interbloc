import {formatFromDenom} from 'utils/formatting/coins';
import routes from 'config/routes';

export const MsgSendType = "/cosmos.bank.v1beta1.MsgSend";

export const ParseMsgSend = (data) => {
    const [amount, denom] = formatFromDenom(data.amount[0].amount, data.amount[0].denom);
    
    return {
        'title': 'Send',
        'from': {
            title: data.fromAddress,
            href: `${routes.public.account}/${data.fromAddress}`,
            newTab: false
        },
        'to': {
            title: data.toAddress,
            href: `${routes.public.account}/${data.toAddress}`,
            newTab: false
        },
        'amount': {
            title: `${amount} ${denom}`
        }
    }
}
