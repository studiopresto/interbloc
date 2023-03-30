import {transactions, labels} from "~config/transactions";
import {formatFromDenom} from "~utils/formatting/coins";
import coinConfig from "../../coin.config";

export const formatMessageToReadableArray = (data) => {
    // Parse transaction to make it readable. Returns as [flagIfFormatted: bool, Title: str, data: Object/Array]
    if (Object.keys(transactions).includes(data.type)){
        const parsedData = transactions[data.type](data);
        const title = parsedData['title'];
        delete parsedData['title'];
        const parsedArray = Object.keys(parsedData).map( key => [labels[key], parsedData[key]])

        return [true, title, parsedArray];
    }
    const type = data.type.split('.');
    return [false, type.slice(-1)[0], data];
}
export const formatMessageToObject = (data) => {
    // Parse transaction to make it readable for the transactions list Returns as [flagIfFormatted: bool, Title: str, data: Object/Array]
    let parsedData = {}
    if (Object.keys(transactions).includes(data.type)){
        parsedData = transactions[data.type](data);
    } else {
        parsedData = structuredClone(data);
        const type = data.type.split('.');
        parsedData.title = type.slice(-1)[0]
        if (Object.keys(parsedData).includes('amount')) {
            const [amount, denom] = [0, coinConfig.denom]
            if (typeof data.amount === 'array' ){
                [amount, denom] = formatFromDenom(data.amount[0].amount, data.amount[0].denom)
            } else if (typeof data.amount === 'object') {
                [amount, denom] = formatFromDenom(data.amount.amount, data.amount.denom)
            }

            parsedData.amount = amount + ' ' + denom

        }
    }
    return parsedData;
}
