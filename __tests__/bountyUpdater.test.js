const bountyUpdater = require('../openq-api/bountyUpdater');
const { mockGetIssue, mockCreateNewBounty } = require('./mocks/mocks');

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
});