const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');
const main = require('../main');

const { BountyCreatedEvent } = require('../data');
const postGithubComment = require('../github-bot/postGithubComment');

describe('postGithubComment', () => {
	let mock;

	beforeAll(() => {
		mock = new MockAdapter(axios);
	});

	beforeEach(() => {
		mock.reset();
	});

	it('calls /githubbot/created with correct data from event', async () => {
		const mockPost = jest.spyOn(axios, 'post');

		mockPost.mockImplementation((url) => {
			switch (url) {
				case 'githubbot/created':
					return Promise.resolve({ data: 1 });
				default:
					return Promise.resolve({ data: 1 });
			}
		});

		const result = await postGithubComment(
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

		const url = mockPost.mock.calls[0][0];
		const { bountyId, id } = mockPost.mock.calls[0][1];
		const { headers } = mockPost.mock.calls[0][2];

		expect(url).toEqual('https://staging.openq.dev/githubbot/created');
		expect(bountyId).toEqual('I_kwDOGWnnz85L2NI_');
		expect(id).toEqual('0x94e09468616365256F11F4544e65cE0C70ee624b');
		expect(headers).toEqual({ Authorization: 'githubBotSecret123' });
	});
});