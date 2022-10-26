const { UPDATE_BOUNTY } = require('./graphql');
const axios = require('axios');

const updateBounty = async (baseUrl, openqApiSecret, variables) => {
	return new Promise(async (resolve, reject) => {
		const {address, tokenAddress, volume } = variables;
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: UPDATE_BOUNTY,
						variables,
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

module.exports = updateBounty;