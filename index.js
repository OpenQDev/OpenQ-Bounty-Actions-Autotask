const main = require('./main');

exports.handler = async (event) => {
	try {
		let result = await main(event);
		return result;
	} catch (error) {
		return `Error occured during processing: ${error}`;
	}
};

// To run locally (this code will not be executed in Autotasks)
// if (require.main === module) {
// 	require('dotenv').config();
// 	const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
// 	handler({ apiKey, apiSecret })
// 		.then(() => process.exit(0))
// 		.catch((error) => { console.error(error); process.exit(1); });
// }