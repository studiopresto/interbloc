import coinConfig from "../../coin.config";
import {fromBech32, fromHex, toBech32} from "@cosmjs/encoding";
import { Bech32, fromBase64, toHex } from "@cosmjs/encoding";
import { decodeBech32Pubkey, encodeBech32Pubkey } from "@cosmjs/launchpad"

export const toValoper = a => {
    const bech32Address = toBech32("cosmosvalcons", a);
    console.log(bech32Address);    let addr = toBech32(coinConfig.addrPrefix, fromHex(a));
    const proposer = fromBech32("cosmosvaloper14l0fp639yudfl46zauvv8rkzjgd4u0zk2aseys").data
    if (proposer === addr.data){
        alert("Now");
    }
    return addr
}
