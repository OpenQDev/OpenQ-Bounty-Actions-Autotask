const bountyUpdater = require('../openq-api/bountyUpdater');
const { mockGetIssue, mockCreateNewBounty, mockAddToBounty } = require('../__mocks__/mocks');

describe('bountyUpdater', () => {
	it('BountyCreated', async () => {
		// ACT
		const result = await bountyUpdater('BountyCreated', 'https://staging.openq.dev/api', 'apiSecret123', { bountyAddress: "0xaddress", bountyId: 'bountyId123', organization: 'orgId123', bountyType: 0 }, mockGetIssue, mockCreateNewBounty, mockAddToBounty);

		const { baseUrl, openqApiSecret, bountyAddress, bountyId, organization, category, type } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(bountyAddress).toEqual('0xaddress');
		expect(bountyId).toEqual('bountyId123');
		expect(organization).toEqual('orgId123');
		expect(category).toEqual(undefined);
		expect(type).toEqual('0');
	});

	it('TokenDepositReceived', async () => {
		// ACT
		const params = { volume: '1000', tokenAddress: '0xtoken', bountyAddress: 'oxbounty' };
		const result = await bountyUpdater('TokenDepositReceived', 'https://staging.openq.dev/api', 'apiSecret123', params, mockGetIssue, mockCreateNewBounty, mockAddToBounty);

		const { baseUrl, openqApiSecret, tokenBalance, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(tokenBalance).toEqual({ "tokenAddress": "0xtoken", "volume": 1000 });
		expect(address).toEqual('oxbounty');
		expect(add).toEqual(true);
	});

	it('DepositRefunded', async () => {
		// ACT
		const params = { volume: '1000', tokenAddress: '0xtoken', bountyAddress: 'oxbounty' };
		const result = await bountyUpdater('DepositRefunded', 'https://staging.openq.dev/api', 'apiSecret123', params, mockGetIssue, mockCreateNewBounty, mockAddToBounty);

		const { baseUrl, openqApiSecret, tokenBalance, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(tokenBalance).toEqual({ "tokenAddress": "0xtoken", "volume": 1000 });
		expect(address).toEqual('oxbounty');
		expect(add).toEqual(false);
	});

	it('TokenBalanceClaimed', async () => {
		// ACT
		const params = { volume: '1000', tokenAddress: '0xtoken', bountyAddress: 'oxbounty' };
		const result = await bountyUpdater('TokenBalanceClaimed', 'https://staging.openq.dev/api', 'apiSecret123', params, mockGetIssue, mockCreateNewBounty, mockAddToBounty);

		const { baseUrl, openqApiSecret, tokenBalance, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(tokenBalance).toEqual({ "tokenAddress": "0xtoken", "volume": 1000 });
		expect(address).toEqual('oxbounty');
		expect(add).toEqual(false);
	});
});