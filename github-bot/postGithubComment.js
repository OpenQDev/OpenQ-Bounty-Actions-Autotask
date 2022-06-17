const axios = require('axios');

const postGithubComment = async (baseUrl, eventType, githubBotSecret, params) => {
	const headers = {
		'Authorization': githubBotSecret
	};

	let result = null;
	switch (eventType) {
		case 'BountyCreated': {
			const { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime } = params;
			result = await axios.post(`${baseUrl}/githubbot/created`, {
				bountyId,
				id: bountyAddress
			}, { headers });
			return resolve({ bountyId, organization, issuerAddress, bountyAddress, bountyMintTime });
		}
		case 'TokenDepositReceived': {
			const { tokenAddress, volume, bountyId, bountyAddress } = params;
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
};

module.exports = postGithubComment;