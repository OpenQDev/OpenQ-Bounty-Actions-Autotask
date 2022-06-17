const axios = require('axios');
const main = require('../main');

const postGithubComment = require('../github-bot/postGithubComment');

describe('postGithubComment', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call /githubbot/created with correct data for BountyCreated event', async () => {
		// ARRANGE
		const mockPost = jest.spyOn(axios, 'post');

		mockPost.mockImplementation((url) => {
			switch (url) {
				case 'githubbot/created':
					return Promise.resolve({ data: 1 });
				default:
					return Promise.resolve({ data: 1 });
			}
		});

		// ACT
		await postGithubComment(
			'https://staging.openq.dev',
			'BountyCreated',
			'githubBotSecret123',
			{
				bountyId: "I_kwDOGWnnz85L2NI_",
				organization: "MDEyOk9yZ2FuaXphdGlvbjc3NDAyNTM4",
				issuerAddress: "0x46e09468616365256F11F4544e65cE0C70ee624b",
				bountyAddress: "0x94e09468616365256F11F4544e65cE0C70ee624b",
				bountyMintTime: 143434343
			}
		);

		// ASSERT
		const url = mockPost.mock.calls[0][0];
		const { bountyId, id } = mockPost.mock.calls[0][1];
		const { headers } = mockPost.mock.calls[0][2];

		expect(url).toEqual('https://staging.openq.dev/githubbot/created');
		expect(bountyId).toEqual('I_kwDOGWnnz85L2NI_');
		expect(id).toEqual('0x94e09468616365256F11F4544e65cE0C70ee624b');
		expect(headers).toEqual({ Authorization: 'githubBotSecret123' });
	});

	it('should call /githubbot/funded with correct data for TokenDepositReceived event', async () => {
		// ARRANGE
		const mockPost = jest.spyOn(axios, 'post');

		mockPost.mockImplementation((url) => {
			switch (url) {
				case 'githubbot/created':
					return Promise.resolve({ data: 1 });
				default:
					return Promise.resolve({ data: 1 });
			}
		});

		// ACT
		await postGithubComment(
			'https://staging.openq.dev',
			'TokenDepositReceived',
			'githubBotSecret123',
			{
				tokenAddress: "0x43209468616365256F11F4544e65cE0C70ee624b",
				volume: 1000,
				bountyId: "I_kwDOGWnnz85L2NI_",
				bountyAddress: "0x94e09468616365256F11F4544e65cE0C70ee624b"
			}
		);

		// ASSERT
		const url = mockPost.mock.calls[0][0];
		const { bountyId, id, deposit } = mockPost.mock.calls[0][1];
		const { tokenAddress, tokenVolumes } = deposit;
		const { headers } = mockPost.mock.calls[0][2];

		expect(url).toEqual('https://staging.openq.dev/githubbot/funded');
		expect(bountyId).toEqual('I_kwDOGWnnz85L2NI_');
		expect(id).toEqual('0x94e09468616365256F11F4544e65cE0C70ee624b');
		expect(tokenAddress).toEqual('0x43209468616365256F11F4544e65cE0C70ee624b');
		expect(tokenVolumes).toEqual(1000);
		expect(headers).toEqual({ Authorization: 'githubBotSecret123' });
	});
});