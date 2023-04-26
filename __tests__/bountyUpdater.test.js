const bountyUpdater = require('../openq-api/bountyUpdater');
const { mockGetIssue, mockCreateNewBounty, mockUpdateBountyValuation, mockGetValueFromBalance } = require('../__mocks__/mocks');

describe('bountyUpdater', () => {
	it('BountyCreated', async () => {
		const pat = 'pat123';
		const invoiceUrl = 'invoiceUrl123';
		const coinApiUrl = 'coinApiUrl123';
		const data = "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000018363434393264333031376435613165316633316362653961000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
		// ACT
		const result = await bountyUpdater('BountyCreated', 'https://staging.openq.dev/api', 'apiSecret123', { bountyAddress: '0xaddress', bountyId: 'bountyId123', organization: 'orgId123', bountyType: 0, data }, pat, invoiceUrl, coinApiUrl, mockGetIssue, mockCreateNewBounty, mockUpdateBountyValuation, mockGetValueFromBalance);

		const { baseUrl, openqApiSecret, bountyAddress, bountyId, organization, category, bountyType } = result;
		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(bountyAddress).toEqual('0xaddress');
		expect(bountyId).toEqual('bountyId123');
		expect(organization).toEqual('orgId123');
		expect(category).toEqual(undefined);
		expect(bountyType).toEqual('0');
	});

	it('TokenDepositReceived', async () => {
		// ACT

		const zeroAddress = '0x0000000000000000000000000000000000000000';
		const params = { volume: '1000', tokenAddress: zeroAddress, bountyAddress: 'oxbounty' };
		const pat = 'pat123';
		const invoiceUrl = 'invoiceUrl123';
		const coinApiUrl = 'coinApiUrl123';
		const result = await bountyUpdater('TokenDepositReceived', 'https://staging.openq.dev/api', 'apiSecret123', params, pat, invoiceUrl, coinApiUrl, mockGetIssue, mockCreateNewBounty, mockUpdateBountyValuation, mockGetValueFromBalance);

		const { baseUrl, openqApiSecret, variables, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
		expect(variables).toEqual({
			'address': 'oxbounty',
			"tvc": 0,
			'tvl': {
				'coinAPIReq': {
					"network": "polygon-pos",
					'tokenVolumes': {
						'0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270': {
							'decimals': 18,
							'volume': '1000',
						},
					},
				},
				'coinApiUrl': 'coinApiUrl123',
			}
		});
	});

	it('DepositRefunded', async () => {
		// ACT

		const zeroAddress = '0x0000000000000000000000000000000000000000';
		const params = { volume: '1000', tokenAddress: zeroAddress, bountyAddress: 'oxbounty' };
		const pat = 'pat123';
		const invoiceUrl = 'invoiceUrl123';
		const coinApiUrl = 'coinApiUrl123';
		const result = await bountyUpdater('DepositRefunded', 'https://staging.openq.dev/api', 'apiSecret123', params, pat, invoiceUrl, coinApiUrl, mockGetIssue, mockCreateNewBounty, mockUpdateBountyValuation, mockGetValueFromBalance);

		const { baseUrl, openqApiSecret, variables, address, add } = result;

		// ASSERT
		expect(baseUrl).toEqual('https://staging.openq.dev/api');
		expect(openqApiSecret).toEqual('apiSecret123');
			expect(variables).toEqual({
			'address': 'oxbounty',
			'tvl': NaN,
			"tvc":0
		});
	});

	it('TokenBalanceClaimed', async () => {
		// ACT

		const zeroAddress = '0x0000000000000000000000000000000000000000';
		const params = { volume: '1000', tokenAddress: zeroAddress, bountyAddress: 'oxbounty' };
		const pat = 'pat123';
		const invoiceUrl = 'invoiceUrl123';
		const coinApiUrl = 'coinApiUrl123';
		const result = await bountyUpdater('TokenBalanceClaimed', 'https://staging.openq.dev/api', 'apiSecret123', params, pat, invoiceUrl, coinApiUrl, mockGetIssue, mockCreateNewBounty, mockUpdateBountyValuation, mockGetValueFromBalance);

		const value = result;
		expect(value).toEqual({
			'baseUrl': 'https://staging.openq.dev/api',
			'openqApiSecret': 'apiSecret123',
			'variables': {
				'address': 'oxbounty',
				'tvc': { 'coinAPIReq': { "network": "polygon-pos", 'tokenVolumes': { '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270': { 'decimals': 18, 'volume': '1000' } } }, 'coinApiUrl': 'coinApiUrl123' },
				'tvl': 0
			}
		}
		);

	});
});