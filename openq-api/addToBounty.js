const { ADD_TO_BOUNTY } = require('./graphql');
const axios = require('axios');

const addToBounty = async (baseUrl, openqApiSecret, tokenBalance, address, add) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: ADD_TO_BOUNTY,
						variables: { address, tokenBalance, add },
					},
					{
						headers: {
							'Authorization': openqApiSecret,
						},
					}
				);
			return resolve(result.data);
		} catch (error) {
			return reject(error);
		}
	});
};

module.exports = addToBounty;