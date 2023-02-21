const { getCoinApiUrl,
	STAGING_OPENQ_SENTINEL_ID,
	STAGING_CLAIM_MANAGER_SENTINEL_ID,
	STAGING_DEPOSIT_MANAGER_SENTINEL_ID,
	PRODUCTION_OPENQ_SENTINEL_ID,
	PRODUCTION_CLAIM_MANAGER_SENTINEL_ID,
	PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID,
	LOCAL_EVENT_LISTENER_ID
} = require('../utils');

describe('getCoinApiUrl', () => {
	it('returns correct base url for each environment', () => {
		expect(getCoinApiUrl(STAGING_OPENQ_SENTINEL_ID)).toEqual('https://staging.openq.dev/tvl');
		expect(getCoinApiUrl(STAGING_CLAIM_MANAGER_SENTINEL_ID)).toEqual('https://staging.openq.dev/tvl');
		expect(getCoinApiUrl(STAGING_DEPOSIT_MANAGER_SENTINEL_ID)).toEqual('https://staging.openq.dev/tvl');

		expect(getCoinApiUrl(PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID)).toEqual('https://www.openq.dev/tvl');
		expect(getCoinApiUrl(LOCAL_EVENT_LISTENER_ID)).toEqual('http://openq-coinapi:8081/tvl');
	});
});