export const STATUS = {
	IDLE: 'IDLE',
	PENDING: 'PENDING',
	FULFILLED: 'FULFILLED',
	REJECTED: 'REJECTED',
};

export const LANGUAGES = [
	{ id: 'en', iso: 'eng', name: 'English', icon: '/static/icons/GB.svg' },
	{ id: 'de', iso: 'deu', name: 'Deutsch', icon: '/static/icons/DE.svg' },
	{ id: 'fr', iso: 'fre', name: 'French', icon: '/static/icons/FR.svg' },
	{ id: 'id', iso: 'ind', name: 'Indonesian', icon: '/static/icons/ID.svg' },
	{ id: 'ko', iso: 'kor', name: 'Korean', icon: '/static/icons/KR.svg' },
	{ id: 'ml', iso: 'mal', name: 'Malay', icon: '/static/icons/MY.svg' },
	{ id: 'es', iso: 'spa', name: 'Spanish', icon: '/static/icons/ES.svg' },
	{ id: 'th', iso: 'tha', name: 'Thai', icon: '/static/icons/TH.svg' },
	{ id: 'tr', iso: 'tur', name: 'Turkish', icon: '/static/icons/TR.svg' },
	{ id: 'fil', iso: 'fil', name: 'Filipino', icon: '/static/icons/PH.svg' }
];

export const QUERY_PARAMETERS = {
	LIMIT: 10,
	PARE_PAGE: 10
};

const LOCALSTORAGE_HOURS = 24;
export const LOCALSTORAGE_EXPIRY = LOCALSTORAGE_HOURS * 60 * 60 * 1000;