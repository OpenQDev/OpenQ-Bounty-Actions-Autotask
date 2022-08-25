const { getBaseUrl,
	STAGING_OPENQ_SENTINEL_ID,
	STAGING_CLAIM_MANAGER_SENTINEL_ID,
	STAGING_DEPOSIT_MANAGER_SENTINEL_ID,
	PRODUCTION_OPENQ_SENTINEL_ID,
	PRODUCTION_CLAIM_MANAGER_SENTINEL_ID,
	PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID,
	LOCAL_EVENT_LISTENER_ID
} = require('../utils');

describe('getBaseUrl', () => {
	it('returns correct base url for each environment', () => {
		expect(getBaseUrl(STAGING_OPENQ_SENTINEL_ID)).toEqual('https://staging.openq.dev/api');
		expect(getBaseUrl(STAGING_CLAIM_MANAGER_SENTINEL_ID)).toEqual('https://staging.openq.dev/api');
		expect(getBaseUrl(STAGING_DEPOSIT_MANAGER_SENTINEL_ID)).toEqual('https://staging.openq.dev/api');

		expect(getBaseUrl(PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID)).toEqual('https://app.openq.dev/api');
		expect(getBaseUrl(LOCAL_EVENT_LISTENER_ID)).toEqual('http://openq-api:4000');
	});
});