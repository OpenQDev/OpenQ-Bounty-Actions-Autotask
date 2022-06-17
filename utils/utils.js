const getBaseUrl = (autotaskId) => {
	let baseUrl = null;
	switch (autotaskId) {
		case '2428d581-5289-40d2-927d-67ab8b58e2eb':
			return 'https://development.openq.dev';
		case '9b6f157e-d6b8-486b-97b8-ba6a0282b235':
			return 'https://staging.openq.dev';
		case '691feb17-fc3f-499c-a17b-550b42ba1f9f':
			return 'https://app.openq.dev';
		default:
			return reject(new Error('Incorrect Environment'));
	}
};

module.exports = { getBaseUrl };