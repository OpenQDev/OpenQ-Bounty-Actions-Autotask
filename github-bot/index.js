const postGithubComment = async (eventType) => {
	const headers = {
		'Authorization': event.secrets.GITHUB_BOT_SECRET
	};

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
			console.log('data is', { tokenAddress, volume, bountyId, bountyAddress });
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