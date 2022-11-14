const { CREATE_CONTEST } = require('./graphql');
const axios = require('axios');

const createNewContest = async (baseUrl, openqApiSecret, organizationId, repositoryId, bountyId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: CREATE_CONTEST,
						variables: { organizationId, repositoryId, bountyId },
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

module.exports = createNewContest;