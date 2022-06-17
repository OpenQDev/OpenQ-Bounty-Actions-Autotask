const STAGING_SENTINEL_ID = "9b6f157e-d6b8-486b-97b8-ba6a0282b235";
const PRODUCTION_SENTINEL_ID = '691feb17-fc3f-499c-a17b-550b42ba1f9f';

const getBaseUrl = (autotaskId) => {
	let baseUrl = null;
	switch (autotaskId) {
		case STAGING_SENTINEL_ID:
			return 'https://staging.openq.dev';
		case PRODUCTION_SENTINEL_ID:
			return 'https://app.openq.dev';
		default:
			return reject(new Error('Incorrect Environment'));
	}
};

module.exports = { getBaseUrl, STAGING_SENTINEL_ID, PRODUCTION_SENTINEL_ID };