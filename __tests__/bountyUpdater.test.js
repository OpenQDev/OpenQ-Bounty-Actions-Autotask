const axios = require('axios');

const bountyUpdater = require('../openq-api/bountyUpdater');

describe('bountyUpdater', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('BountyCreated', async () => {
		// ARRANGE
		const mockPost = jest.spyOn(axios, 'post');

		mockPost.mockImplementation((url) => {
			return Promise.resolve({ data: 1 });
		});

		// ACT
		await bountyUpdater('BountyCreated', 'https://staging.openq.dev/api', 'apiSecret123', { bountyAddress: "0xaddress", bountyId: 'bountyId123', organization: 'orgId123' });

		// ASSERT
		const url = mockPost.mock.calls[0][0];
		console.log('mockPost.mock.calls[0][1].variables', mockPost.mock.calls[0][1].variables);
		const { bountyId, address, organizationId } = mockPost.mock.calls[0][1].variables;
		const { headers } = mockPost.mock.calls[0][2];

		expect(url).toEqual('https://staging.openq.dev/api/graphql');
		expect(bountyId).toEqual('bountyId123');
		expect(address).toEqual('0xaddress');
		expect(organizationId).toEqual('orgId123');
		expect(headers).toEqual({ Authorization: 'apiSecret123' });
	});
});