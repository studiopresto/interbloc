import getHeaders from './headers';
import HttpError from './error';



export default async function externalDataProvider(method, url) {
	try {
		const headers = getHeaders();
		const response = await fetch(url, {
			headers,
			method,
		});

		let json;
		const body = await response.text();
		try {
			json = JSON.parse(body);
		} catch (e) {
			json = body;
		}

		return Promise.resolve(json);

	} catch (error) {
		console.error('Error in externalDataProvider -> fetch');
		throw error;
	}

}