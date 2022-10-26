const { ADD_TO_VALUE_CLAIMED } = require('./graphql');
const axios = require('axios');

const addToValueClaimed = async (baseUrl, openqApiSecret, variables) => {
const {volume, address, add, tokenAddress}=variables
	return new Promise(async (resolve, reject) => {
		try {
		console.log(volume, address, add, tokenAddress)
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: ADD_TO_VALUE_CLAIMED,
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
		console.log(error.response.data)
			return reject(error);
		}
	});
};

module.exports = addToValueClaimed;