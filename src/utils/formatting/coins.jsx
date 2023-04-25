import coinConfig from "../../../coin.config";

export const formatCoinsToReadable = n => {
    const multiplier = n > 0 ? 1 : -1;
    n *= multiplier;

    if (n < 1e3) return { value: (n * multiplier), suffix: ""};
    if (n >= 1e3 && n < 1e6) return { value: +(n* multiplier / 1e3).toFixed(1), suffix: "K"};
    if (n >= 1e6 && n < 1e9) return {value: +(n* multiplier / 1e6).toFixed(1), suffix: "M"};
    if (n >= 1e9 && n < 1e12) return {value:  +(n* multiplier / 1e9).toFixed(1), suffix: "B"};
    if (n >= 1e12) return {value: + (n* multiplier / 1e12).toFixed(1), suffix: "T"};
};

export const formatFromBaseDenom = n => {
    const exponent = coinConfig.exponent;
    return (n / 10 ** exponent).toFixed(exponent);
}

export const formtToBaseDenom = n => {
    const exponent = coinConfig.exponent;
    return (n * 10 ** exponent).toFixed(exponent);

}

export const formatCoinsFromBaseDenom = n => {
    let f = formatFromBaseDenom(n);
    return formatCoinsToReadable(f);
}

export const formatFromDenom = (n, d) => {
    // Try to match denom and format it then
    const denom = d.toLowerCase();
    if (denom === coinConfig.denom){
        return [formatCoinsFromBaseDenom(n).value, coinConfig.ticker];
    } else if(denom.startsWith('u')){
        const a = (n / 10 ** 6).toFixed(6);
        return [a, denom.substring(1).toUpperCase()];
    }

    return [n, denom];
}

export const formatDenomToString = (n, d) => {
    let a = formatFromDenom(n, d);
    return a.join(' ');
}

export const formatCoinArrayToString = l => {
    if (l.length === 1){
        return formatDenomToString(l[0].amount, l[0].denom)
    }
}
export const formatCoinsFromBaseDenomToString = n => {
    let f = formatFromBaseDenom(n);
    const p = formatCoinsToReadable(f);
    return p.value + " " + p.suffix;
}


