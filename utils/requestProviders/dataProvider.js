import requestClient from '~utils/requestProviders/requestClient';



function generateQuery(url, obj) {
	const params = new URLSearchParams(obj).toString();
	return params ? `${url}?${params}` : url;
}

export default {
	getOne: (resource, query) => requestClient('GET', generateQuery(resource, query)),
	getList: (resource, query) => requestClient('GET', generateQuery(resource, query)),
};