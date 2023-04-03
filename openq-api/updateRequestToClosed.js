const { UPDATE_REQUEST } = require("./graphql");
const axios = require("axios");

const updateRequestStateToClosed = async (baseUrl, openqApiSecret, variables) => {

  return new Promise(async (resolve, reject) => {
	try {
	  const result = await axios.post(`${baseUrl}/graphql`, {
		query: UPDATE_REQUEST,
		variables,
	  }, {
		headers: {
		  'Authorization': openqApiSecret,
		},
	  });
	  return resolve(result.data);
	} catch (error) {
	  return reject(error);
	}
  });
}

module.exports = updateRequestStateToClosed;