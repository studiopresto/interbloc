import {LOCALSTORAGE_EXPIRY} from 'config/constants';

export function getFromLocalStorageWithExpiry(key) {
	const itemString = localStorage.getItem(key);
	
	if (!itemString) {
		return null
	}
	
	const item = JSON.parse(itemString);
	const now = new Date();
	if (item?.expiry && now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null
	}
	
	return item.data
}

export function setToLocalStorageWithExpiry(key, data, ttl = LOCALSTORAGE_EXPIRY) {
	const now = new Date();
	const item = {
		data: data,
		expiry:now.getTime() + ttl
	};
	try {
		localStorage.setItem(key, JSON.stringify(item));
	} catch (error) {
		console.error(`Error, LocalStorage - `, error)
	}
}