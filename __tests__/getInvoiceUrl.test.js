const { getInvoiceUrl,
	STAGING_OPENQ_SENTINEL_ID,
	STAGING_CLAIM_MANAGER_SENTINEL_ID,
	STAGING_DEPOSIT_MANAGER_SENTINEL_ID,
	PRODUCTION_OPENQ_SENTINEL_ID,
	PRODUCTION_CLAIM_MANAGER_SENTINEL_ID,
	PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID,
	LOCAL_EVENT_LISTENER_ID
} = require('../utils');

describe('getInvoiceUrl', () => {
	it('returns correct base url for each environment', () => {
		expect(getInvoiceUrl(STAGING_OPENQ_SENTINEL_ID)).toEqual('https://staging.openq.dev/email');
		expect(getInvoiceUrl(STAGING_CLAIM_MANAGER_SENTINEL_ID)).toEqual('https://staging.openq.dev/email');
		expect(getInvoiceUrl(STAGING_DEPOSIT_MANAGER_SENTINEL_ID)).toEqual('https://staging.openq.dev/email');

		expect(getInvoiceUrl(PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID)).toEqual('https://openq.dev/email');
		expect(getInvoiceUrl(LOCAL_EVENT_LISTENER_ID)).toEqual('http://openq-invoice-server:3007');
	});
});