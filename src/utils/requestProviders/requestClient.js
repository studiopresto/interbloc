import fetcher from './fetch';



export default async function requestClient(method, url, external = false, data, isFormData = false) {
	try {
		return await fetcher(
			method,
			url,
			external,
			data,
			false,
			isFormData
		);
	} catch (error) {
		if (error.status === 401) {
			window.location.replace('/');
		}

		throw error;
	}
}