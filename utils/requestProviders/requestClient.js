import fetcher from '~utils/requestProviders/fetch';



export default async function requestClient(method, url, data, isFormData = false) {
	try {
		return await fetcher(
			method,
			url,
			data,
			false,
			isFormData,
		);
	} catch (error) {
		if (error.status === 401) {
			window.location.replace('/');
		}

		throw error;
	}
}