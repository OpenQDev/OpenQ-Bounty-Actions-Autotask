// Entrypoint for the Autotask
exports.handler = async function (event) {
	const payload = event.request.body;

	const contractPayload = event.request.body;
	const { matchReasons } = contractPayload;

	const { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime } = matchReasons[0].params;

	return { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime };
};

// // To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
	require('dotenv').config();
	const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
	handler({ apiKey, apiSecret })
		.then(() => process.exit(0))
		.catch((error) => { console.error(error); process.exit(1); });
}

const { Relayer } = require('defender-relay-client');

exports.handler = async function (event) {
	const relayer = new Relayer(event);
	// Use relayer for sending txs or querying the network...
};