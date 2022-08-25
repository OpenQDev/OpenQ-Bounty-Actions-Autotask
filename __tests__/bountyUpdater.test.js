const bountyUpdater = require('../openq-api/bountyUpdater');
const { mockGetIssue, mockCreateNewBounty, mockAddToBounty } = require('./mocks/mocks');

describe('bountyUpdater', () => {
	it('BountyCreated', async () => {
		// ACT
		const result = await bountyUpdater(mockGetIssue, mockCreateNewBounty, 'BountyCreated', 'https://staging.openq.dev/api', 'apiSecret123', { bountyAddress: "0xaddress", bountyId: 'bountyId123', organization: 'orgId123', bountyType: 0 });

		const { baseUrl, openqApiSecret, bountyAddress, bountyId, organization, category, type } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(bountyAddress).toEqual('0xaddress');
		expect(bountyId).toEqual('bountyId123');
		expect(organization).toEqual('orgId123');
		expect(category).toEqual('prime');
		expect(type).toEqual('0');
	});

	it.only('TokenDepositReceived', async () => {
		// ACT
		const params = { volume: '1000', tokenAddress: '0xtoken', bountyAddress: 'oxbounty' };
		const result = await bountyUpdater(mockGetIssue, mockCreateNewBounty, mockAddToBounty, 'TokenDepositReceived', 'https://staging.openq.dev/api', 'apiSecret123', params);

		const { baseUrl, openqApiSecret, tokenBalance, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(tokenBalance).toEqual({ "tokenAddress": "0xtoken", "volume": 1000 });
		expect(address).toEqual('oxbounty');
		expect(add).toEqual(true);
	});

	it.only('DepositRefunded', async () => {
		// ACT
		const params = { volume: '1000', tokenAddress: '0xtoken', bountyAddress: 'oxbounty' };
		const result = await bountyUpdater(mockGetIssue, mockCreateNewBounty, mockAddToBounty, 'DepositRefunded', 'https://staging.openq.dev/api', 'apiSecret123', params);

		const { baseUrl, openqApiSecret, tokenBalance, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(tokenBalance).toEqual({ "tokenAddress": "0xtoken", "volume": 1000 });
		expect(address).toEqual('oxbounty');
		expect(add).toEqual(false);
	});
});