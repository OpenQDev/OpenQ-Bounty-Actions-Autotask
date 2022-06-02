const axios = require('axios');

exports.handler = async (event) => {
	const payload = event.request.body;
	const { matchReasons, sentinel } = payload;
	const { id } = sentinel;
	const { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime } = matchReasons[0].params;

	let baseUrl = null;
	switch (id) {
		case '2428d581-5289-40d2-927d-67ab8b58e2eb':
			baseUrl = 'https://development.openq.dev';
			break;
		default:
			throw new Error('Incorrect Environment');
	}

	const result = await axios.post(`${baseUrl}/githubbot/created`, {
		bountyId,
		id: bountyAddress
	});

	return { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime };
};

// // // To run locally (this code will not be executed in Autotasks)
// if (require.main === module) {
// 	require('dotenv').config();
// 	const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
// 	handler({ apiKey, apiSecret })
// 		.then(() => process.exit(0))
// 		.catch((error) => { console.error(error); process.exit(1); });
// }