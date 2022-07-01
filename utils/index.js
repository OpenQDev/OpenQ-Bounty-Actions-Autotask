const STAGING_SENTINEL_ID = "9b6f157e-d6b8-486b-97b8-ba6a0282b235";
const PRODUCTION_SENTINEL_ID = '691feb17-fc3f-499c-a17b-550b42ba1f9f';
const LOCAL_EVENT_LISTENER_ID = 'local';

const getBaseUrl = (autotaskId) => {
	let baseUrl = null;
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return 'http://openq-api:4000';
		case STAGING_SENTINEL_ID:
			return 'https://staging.openq.dev/api';
		case PRODUCTION_SENTINEL_ID:
			return 'https://app.openq.dev/api';
		default:
			return reject(new Error('Incorrect Environment'));
	}
};

const getBotUrl = (autotaskId) => {
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return 'http://openq-bot:3006';
		case STAGING_SENTINEL_ID:
			return 'https://staging.openq.dev/githubbot';
		case PRODUCTION_SENTINEL_ID:
			return 'https://app.openq.dev/githubbot';
		default:
			return reject(new Error('Incorrect Environment'));
	}
};

const getOpenQApiSecret = (autotaskId, event) => {
	let baseUrl = null;
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return event.secrets.OPENQ_API_SECRET;
		case STAGING_SENTINEL_ID:
			return event.secrets.OPENQ_API_SECRET_STAGING;
		case PRODUCTION_SENTINEL_ID:
			return event.secrets.OPENQ_API_SECRET_PRODUCTION;
		default:
			return reject(new Error('Incorrect Environment'));
	}
};

const getGithubBotSecret = (autotaskId, event) => {
	let baseUrl = null;
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return event.secrets.GITHUB_BOT_SECRET;
		case STAGING_SENTINEL_ID:
			return event.secrets.GITHUB_BOT_SECRET_STAGING;
		case PRODUCTION_SENTINEL_ID:
			return event.secrets.GITHUB_BOT_SECRET_PRODUCTION;
		default:
			return reject(new Error('Incorrect Environment'));
	}
};

module.exports = { getBaseUrl, getBotUrl, getOpenQApiSecret, getGithubBotSecret, STAGING_SENTINEL_ID, PRODUCTION_SENTINEL_ID, LOCAL_EVENT_LISTENER_ID };