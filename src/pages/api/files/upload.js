import dataProvider from 'utils/requestProviders/dataProvider';
import resources from 'utils/requestProviders/resources';

async function handler(req, res) {
	
	const data = await dataProvider.getList(`${resources.validators}`)
		.then(response => {
			let images = [];
			Object.values(response).forEach(option => {
				let id = option.description.identity;
				if (option.description.identity && id !== ' ') {
					const imgUrl = `${process.env.API_SERVER}validator/keybase/image/${id}`;
					images.push(imgUrl)
				}
			})
			return images
		});
	
	return res.status(200).send({ success: true, data: data })
}

export default handler