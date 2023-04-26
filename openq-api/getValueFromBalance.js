const axios = require('axios');

const getValueFromBalance = async (coinAPIReq, coinApiUrl) => {
	
	try {
		const result = await axios.post(coinApiUrl, coinAPIReq);
		const total = result.data.total;
		return total||0;
	}
	catch (error) {
		console.log(error);
		return 0;
	}
};
module.exports = getValueFromBalance;