const { CREATE_BOUNTY } = require('./graphql');
const axios = require('axios');

const createNewBounty = async (baseUrl, openqApiSecret, address, bountyId, organizationId, category, type) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: CREATE_BOUNTY,
						variables: { address, bountyId, organizationId, type, category },
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

module.exports = createNewBounty;