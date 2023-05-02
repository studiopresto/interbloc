import {getDateDifferent} from "../date/getDateDifferent";
import hashShortening from "../string/hashShortening";

export const extractBlockData = (b, a, t) => {
    const header = b.header
    return [
        [t('labels:chain-id'), header.chainId],
        [t('labels:height'), header.height],
        [t('labels:block-time'), `${getDateDifferent(header.time * 1000, new Date())} ago (${new Date(header.time * 1000).toLocaleString()})`],
        [t('labels:block-hash'), hashShortening(b.hash)],
        [t('labels:number-tx'), a.total],
        [t('labels:gas'), t('labels:out-of', { count: a.gas.used, total: a.gas.wanted })],
        [t('labels:consensus-time'), t('labels:soon')],
        [t('labels:proposer'), header.proposerAddress.toUpperCase()],
    ];
}
