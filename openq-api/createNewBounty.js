const { CREATE_NEW_BOUNTY } = require('./graphql');
const axios = require('axios');

const createNewBounty = async (baseUrl, openqApiSecret, address, organizationId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/api`,
					{
						query: CREATE_NEW_BOUNTY,
						variables: { address, organizationId },
					},
					{
						headers: {
							'Authorization': openqApiSecret,
						},
					}
				);
		} catch (error) {
			console.log(error);
		}
	});
};

module.exports = createNewBounty;