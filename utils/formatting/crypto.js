export const sha256 = i => {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(i);

    // hash the i
    const hashBuffer =  crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
