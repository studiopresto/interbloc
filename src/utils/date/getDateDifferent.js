export const getDateDifferent = (from, to) => {
	const FROM = new Date(from);
	const TO = new Date(to);
	const days = parseInt(Math.abs(TO - FROM) / (1000 * 60 * 60 * 24));
	const hours = parseInt(Math.abs(TO - FROM) / (1000 * 60 * 60) % 24);
	const minutes = parseInt(Math.abs(TO.getTime() - FROM.getTime()) / (1000 * 60) % 60);
	const seconds = parseInt(Math.abs(TO.getTime() - FROM.getTime()) / (1000) % 60);

	return `${!!days ? days+'d' : ''} ${!!hours ? hours+'h' : ''} ${!!minutes ? minutes+'m' : ''} ${!!seconds ? seconds+'s' : ''}`;
}