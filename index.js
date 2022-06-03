const axios = require('axios');

exports.handler = async (event) => {
	const payload = event.request.body;
	const { matchReasons, sentinel } = payload;
	const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
	const { id } = sentinel;
	const { tokenAddress, volume, bountyId, bountyAddress } = matchReasons[0].params;

	let baseUrl = null;
	switch (id) {
		case '2428d581-5289-40d2-927d-67ab8b58e2eb':
			baseUrl = 'https://development.openq.dev';
			break;
		default:
			throw new Error('Incorrect Environment');
	}

	let result = null;
	switch (eventType) {
		case 'BountyCreated':
			result = await axios.post(`${baseUrl}/githubbot/created`, {
				bountyId,
				id: bountyAddress
			});
			break;
		case 'TokenDepositReceived':
			result = await axios.post(`${baseUrl}/githubbot/funded`, {
				bountyId,
				id: bountyAddress,
				deposit: {
					tokenAddress,
					tokenVolumes: volume
				}
			});
			break;
		case 'DepositRefunded':
			result = await axios.post(`${baseUrl}/githubbot/refunded`, {
				bountyId,
				id: bountyAddress
			});
			break;
		default:
			throw new Error('Unknown Event');
	}

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