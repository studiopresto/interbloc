import {CHAIN} from "~config/chain";
import placeholder from '~static/images/placeholder.svg';
export const getInfoForDenom = d => {
    if (Object.keys(CHAIN).includes(d)) {
        return CHAIN[d]
    } else {
        if (d.length > 20){
            return {
                ticker: d.substring(0, 20) + "...",
                exponent: 6,
                logo: placeholder

            }
        }
        return {
            ticker: d,
            exponent: 6,
            logo: placeholder

        }
    }
}