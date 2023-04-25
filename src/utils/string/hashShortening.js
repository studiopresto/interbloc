export default function hashShortening(hash) {
	return `${hash.slice(0,6)}...${hash.slice(hash.length - 6, hash.length)}`;
}