import getHeaders from '~utils/requestProviders/headers';
import HttpError from '~utils/requestProviders/error';



export default async function fetcher(method, url, external, data = undefined, authenticated, isFormData = false) {
	try {
		const headers = getHeaders(authenticated, isFormData);
		const response = await fetch(`${external ? url : process.env.API_SERVER + url}`, {
			headers,
			method,
			body: data && !isFormData ? JSON.stringify(data) : data
		});

		let json;
		const body = await response.text();
		try {
			json = JSON.parse(body);
		} catch (e) {
			json = body;
		}
		/*
		Describe type error handled from API
		 */
		if (response.status === 400) {
			return Promise.reject(
				new HttpError(json && json.message, response.status, json)
			);
		}

		if (response.status < 200 || response.status >= 300) {
			return Promise.reject(
				new HttpError(
					(json && json.message) || response.statusText,
					response.status,
					json
				)
			);
		}

		return Promise.resolve(json);

	} catch (error) {
		console.error('Error in dataProvider -> fetch');
		throw error;
	}
}