const main = require('../main');
const bountyUpdater = require('../openq-api/bountyUpdater');
const { mockBountyUpdater, mockGithubBot } = require('../__mocks__/mocks');
const events = require('../__mocks__/events.json');

describe('bountyUpdater', () => {
	it('BountyCreated', async () => {
		const result = await main(events.created, mockBountyUpdater, mockGithubBot);
		expect(result).toEqual({
			openQApiResult: {
				eventType: 'BountyCreated',
				baseUrl: 'http://openq-api:4000',
				openqApiSecret: 'secret123!',
				params: {
					bountyAddress: '0x',
					bountyId: 'bountyId',
					organization: 'organizationid',
					bountyType: '0'
				}
			},
			githubBotResult: {
				botUrl: 'http://openq-bot:3006',
				eventType: 'BountyCreated',
				githubBotSecret: 'ghbotsecret123!',
				params: {
					bountyAddress: '0x',
					bountyId: 'bountyId',
					organization: 'organizationid',
					bountyType: '0'
				}
			}
		});
	});

	it('TokenDepositReceived', async () => {
		const result = await main(events.funded, mockBountyUpdater, mockGithubBot);
		expect(result).toEqual({
			openQApiResult: {
				eventType: 'TokenDepositReceived',
				baseUrl: 'http://openq-api:4000',
				openqApiSecret: 'secret123!',
				params: {
					bountyAddress: '0xbounty',
					tokenAddress: '0xtokenaddress',
					volume: 1000
				}
			},
			githubBotResult: {
				botUrl: 'http://openq-bot:3006',
				eventType: 'TokenDepositReceived',
				githubBotSecret: 'ghbotsecret123!',
				params: {
					bountyAddress: '0xbounty',
					tokenAddress: '0xtokenaddress',
					volume: 1000
				}
			}
		});
	});

	it('DepositRefunded', async () => {
		const result = await main(events.refunded, mockBountyUpdater, mockGithubBot);
		expect(result).toEqual({
			openQApiResult: {
				eventType: 'DepositRefunded',
				baseUrl: 'http://openq-api:4000',
				openqApiSecret: 'secret123!',
				params: {
					bountyAddress: '0xbounty',
					tokenAddress: '0xtokenaddress',
					volume: 1000
				}
			},
			githubBotResult: {
				botUrl: 'http://openq-bot:3006',
				eventType: 'DepositRefunded',
				githubBotSecret: 'ghbotsecret123!',
				params: {
					bountyAddress: '0xbounty',
					tokenAddress: '0xtokenaddress',
					volume: 1000
				}
			}
		});
	});

	it('TokenBalanceClaimed', async () => {
		const result = await main(events.claimed, mockBountyUpdater, mockGithubBot);
		expect(result).toEqual({
			openQApiResult: {
				eventType: 'TokenBalanceClaimed',
				baseUrl: 'http://openq-api:4000',
				openqApiSecret: 'secret123!',
				params: {
					bountyAddress: '0xbounty',
					tokenAddress: '0xtokenaddress',
					volume: 1000
				}
			},
			githubBotResult: {
				botUrl: 'http://openq-bot:3006',
				eventType: 'TokenBalanceClaimed',
				githubBotSecret: 'ghbotsecret123!',
				params: {
					bountyAddress: '0xbounty',
					tokenAddress: '0xtokenaddress',
					volume: 1000
				}
			}
		});
	});
});