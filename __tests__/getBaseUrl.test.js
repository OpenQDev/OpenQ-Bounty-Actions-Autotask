const { getBaseUrl, STAGING_SENTINEL_ID, PRODUCTION_SENTINEL_ID } = require('../utils');

describe('getBaseUrl', () => {
	it('returns correct base url for each environment', () => {
		const stagingBaseUrl = getBaseUrl(STAGING_SENTINEL_ID);
		expect(stagingBaseUrl).toEqual('https://staging.openq.dev');

		const productionBaseUrl = getBaseUrl(PRODUCTION_SENTINEL_ID);
		expect(productionBaseUrl).toEqual('https://app.openq.dev');
	});
});