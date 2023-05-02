export default function hashShortening(hash, size = 6) {
	return `${hash.slice(0,size)}...${hash.slice(hash.length - size, hash.length)}`;
}