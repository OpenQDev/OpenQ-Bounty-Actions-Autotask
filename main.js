const axios = require('axios');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
		const { id } = sentinel;

		const headers = {
			'Authorization': event.secrets.GITHUB_BOT_SECRET
		};

		console.log('event.secrets.GITHUB_BOT_SECRET', event.secrets.GITHUB_BOT_SECRET);

		let baseUrl = null;
		switch (id) {
			case '2428d581-5289-40d2-927d-67ab8b58e2eb':
				baseUrl = 'https://development.openq.dev';
				break;
			default:
				return reject(new Error('Incorrect Environment'));
		}

		let result = null;
		switch (eventType) {
			case 'BountyCreated': {
				const { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime } = matchReasons[0].params;
				const headers = {
					'Authorization': event.secrets.GITHUB_BOT_SECRET
				};
				result = await axios.post(`${baseUrl}/githubbot/created`, {
					bountyId,
					id: bountyAddress
				}, { headers });
				return resolve({ bountyId, organization, issuerAddress, bountyAddress, bountyMintTime });
			}
			case 'TokenDepositReceived': {
				const { tokenAddress, volume, bountyId, bountyAddress } = matchReasons[0].params;
				result = await axios.post(`${baseUrl}/githubbot/funded`, {
					bountyId,
					id: bountyAddress,
					deposit: {
						tokenAddress,
						tokenVolumes: volume
					}
				}, { headers });
				return resolve({ tokenAddress, volume, bountyId, bountyAddress });
			}
			case 'DepositRefunded': {
				const { bountyId, bountyAddress } = matchReasons[0].params;
				result = await axios.post(`${baseUrl}/githubbot/refunded`, {
					bountyId,
					id: bountyAddress
				}, { headers });
				return resolve({ bountyId, bountyAddress });
			}
			default: {
				reject(new Error('Unknown Event'));
			}
		}
	});
};

module.exports = main;