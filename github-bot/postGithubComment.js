const axios = require('axios');

const postGithubComment = async (baseUrl, eventType, githubBotSecret, params) => {
	return new Promise(async (resolve, reject) => {

		const headers = {
			'Authorization': githubBotSecret
		};

		let result = null;
		try {
			switch (eventType) {
				case 'BountyCreated': {
					const { bountyId, organization, issuerAddress, bountyAddress, bountyMintTime } = params;
					result = await axios.post(`${baseUrl}/created`, {
						bountyId,
						id: bountyAddress
					}, { headers });
					return resolve({ bountyId, organization, issuerAddress, bountyAddress, bountyMintTime });
				}
				case 'TokenDepositReceived': {
					const { tokenAddress, volume, bountyId, bountyAddress } = params;
					result = await axios.post(`${baseUrl}/funded`, {
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
					const { bountyId, bountyAddress, tokenAddress, volume } = params;
					result = await axios.post(`${baseUrl}/refunded`, {
						bountyId,
						id: bountyAddress,
						tokenAddress,
						volume
					}, { headers });
					return resolve({ bountyId, bountyAddress, tokenAddress, volume });
				}
				case 'BountyClosed': {
					const { bountyId, bountyAddress, closerData } = params;
					result = await axios.post(`${baseUrl}/closed`, {
						bountyId,
						id: bountyAddress,
						closerData
					}, { headers });
					return resolve({ bountyId, bountyAddress, closerData });
				}

				default: {
					reject(new Error('Unknown Event'));
				}
			}
		} catch (error) {
			console.error(error);
		}
	});
};

module.exports = postGithubComment;