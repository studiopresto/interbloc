// const fs = require('fs');
// const path = require("path");
// const common = require('../../../../locales/en/common.json');
// const filePath = path.join(__dirname, '../../../../locales/en/common.json');
//
// async function handler(req, res) {
//
// 	const a = {'box-test': 'Test Hello'}
//
// 	if (common) {
//
// 		await fs.writeFileSync(filePath, JSON.stringify({...common, ...a}, null, 4));
//
// 		res.status(200).send({ success: true, common: {...common, ...a} })
// 	}
//
// 	res.status(500).json({ error: 'Some error' })
// }
//
// export default handler