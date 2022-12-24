const { ADD_TO_VALUE_CLAIMED } = require('./graphql');
const axios = require('axios');

const addToValueClaimed = async (baseUrl, openqApiSecret, variables) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						mutation: ADD_TO_VALUE_CLAIMED,
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

module.exports = addToValueClaimed;