import coinConfig from "../../coin.config";

export const formatCoinsToReadable = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return { value: +(n / 1e3).toFixed(1), suffix: "K"};
    if (n >= 1e6 && n < 1e9) return {value: +(n / 1e6).toFixed(1), suffix: "M"};
    if (n >= 1e9 && n < 1e12) return {value:  +(n / 1e9).toFixed(1), suffix: "B"};
    if (n >= 1e12) return {value: + (n / 1e12).toFixed(1), suffix: "T"};
};

export const formatFromBaseDenom = n => {
    const exponent = coinConfig.exponent
    return (n / 10 ** exponent).toFixed(exponent)
}

export const formtToBaseDenom = n => {
    const exponent = coinConfig.exponent
    return (n * 10 ** exponent).toFixed(exponent)

}

export const formatCoinsFromBaseDenom = n => {
    let f = formatFromBaseDenom(n)
    return formatCoinsToReadable(f)
}
