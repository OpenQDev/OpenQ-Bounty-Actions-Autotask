const { UPDATE_BOUNTY_VALUATION } = require('./graphql');
const axios = require('axios');

const updateBountyValuation = async (baseUrl, openqApiSecret, variables) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: UPDATE_BOUNTY_VALUATION,
						variables
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

module.exports = updateBountyValuation;