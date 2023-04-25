import {getDateDifferent} from "../date/getDateDifferent";
import hashShortening from "../string/hashShortening";

export const extractBlockData = (b, a) => {
    const header = b.header
    return [
        ['Chain id', header.chainId],
        ['Height', header.height],
        ['Block Time', `${getDateDifferent(header.time * 1000, new Date())} ago (${new Date(header.time * 1000).toLocaleString()})`],
        ['Block Hash', hashShortening(b.hash)],
        ['Number of Tx ', a.total],
        ['Gas', `${a.gas.used} out of ${a.gas.wanted}`],
        ['Consensus Time', 'Soon'],
        ['Proposer', header.proposerAddress.toUpperCase()],
    ];
}
