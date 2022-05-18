import requestClient from '~utils/requestProviders/requestClient';



function generateQuery(url, obj) {
	const params = new URLSearchParams(obj).toString();
	return params ? `${url}?${params}` : url;
}

export default {
	getOne: (resource, query, external) => requestClient('GET', generateQuery(resource, query), external),
	getList: (resource, query, external) => requestClient('GET', generateQuery(resource, query), external),
};