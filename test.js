const axios = require('axios');

const post = async () => {
	const headers = {
		'Authorization': 'a5d5a4d787f816faabc4738588e8d919bd1a41cf80f8e02685f842b0f2bd49c2'
	};
	const result = await axios.post(`http://localhost:3002/created`, {
		bountyId: 'I_kwDOGAqhQc5LGw-B',
		id: '0x1abcD810374b2C0fCDD11cFA280Df9dA7970da4e'
	}, { headers });

	console.log(result.data);
};

post();