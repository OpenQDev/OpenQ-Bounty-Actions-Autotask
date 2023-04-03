const axios = require("axios");
const {GET_USER} = require("./graphql");

const getUser = async (baseUrl, openqApiSecret, github) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await axios
				.post(
					`${baseUrl}/graphql`,
					{
						query: GET_USER,
						variables: { github },
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
}

module.exports = getUser;