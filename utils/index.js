const STAGING_OPENQ_SENTINEL_ID = "327e3945-3e9c-4c53-bfc7-1c1815751dbe";
const STAGING_CLAIM_MANAGER_SENTINEL_ID = "5dd0340c-a39c-4568-b77b-75a552954244";
const STAGING_DEPOSIT_MANAGER_SENTINEL_ID = "8d1bc7a0-40e8-4af9-b718-77f0d2274444";
const PRODUCTION_OPENQ_SENTINEL_ID = "98e94c27-c43a-460e-a892-1d57c2f768f8";
const PRODUCTION_CLAIM_MANAGER_SENTINEL_ID = "49c5abc4-3fbc-461d-8587-53775d7524d0";
const PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID = "8d34ffd0-ddd4-4008-97fd-99883c77714b";

const LOCAL_EVENT_LISTENER_ID = 'local';

const getBaseUrl = (autotaskId) => {
	let baseUrl = null;
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return 'http://openq-api:4000';
		case STAGING_OPENQ_SENTINEL_ID:
		case STAGING_CLAIM_MANAGER_SENTINEL_ID:
		case STAGING_DEPOSIT_MANAGER_SENTINEL_ID:
			return 'https://staging.openq.dev/api';
		case PRODUCTION_OPENQ_SENTINEL_ID:
		case PRODUCTION_CLAIM_MANAGER_SENTINEL_ID:
		case PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID:
			return 'https://app.openq.dev/api';
		default:
			throw new Error('Incorrect Environment');
	}
};

const getBotUrl = (autotaskId) => {
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return 'http://openq-bot:3006';
		case STAGING_OPENQ_SENTINEL_ID:
		case STAGING_CLAIM_MANAGER_SENTINEL_ID:
		case STAGING_DEPOSIT_MANAGER_SENTINEL_ID:
			return 'https://staging.openq.dev/githubbot';
		case PRODUCTION_OPENQ_SENTINEL_ID:
		case PRODUCTION_CLAIM_MANAGER_SENTINEL_ID:
		case PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID:
			return 'https://app.openq.dev/githubbot';
		default:
			throw new Error('Incorrect Environment');
	}
};

const getOpenQApiSecret = (autotaskId, event) => {
	let baseUrl = null;
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return event.secrets.OPENQ_API_SECRET;
		case STAGING_OPENQ_SENTINEL_ID:
		case STAGING_CLAIM_MANAGER_SENTINEL_ID:
		case STAGING_DEPOSIT_MANAGER_SENTINEL_ID:
			return event.secrets.OPENQ_API_SECRET_STAGING;
		case PRODUCTION_OPENQ_SENTINEL_ID:
		case PRODUCTION_CLAIM_MANAGER_SENTINEL_ID:
		case PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID:
			return event.secrets.OPENQ_API_SECRET_PRODUCTION;
		default:
			throw new Error('Incorrect Environment');
	}
};

const getGithubBotSecret = (autotaskId, event) => {
	let baseUrl = null;
	switch (autotaskId) {
		case LOCAL_EVENT_LISTENER_ID:
			return event.secrets.GITHUB_BOT_SECRET;
		case STAGING_OPENQ_SENTINEL_ID:
		case STAGING_CLAIM_MANAGER_SENTINEL_ID:
		case STAGING_DEPOSIT_MANAGER_SENTINEL_ID:
			return event.secrets.GITHUB_BOT_SECRET_STAGING;
		case PRODUCTION_OPENQ_SENTINEL_ID:
		case PRODUCTION_CLAIM_MANAGER_SENTINEL_ID:
		case PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID:
			return event.secrets.GITHUB_BOT_SECRET_PRODUCTION;
		default:
			throw new Error('Incorrect Environment');
	}
};

module.exports = {
	getBaseUrl,
	getBotUrl,
	getOpenQApiSecret,
	getGithubBotSecret,
	STAGING_OPENQ_SENTINEL_ID,
	STAGING_CLAIM_MANAGER_SENTINEL_ID,
	STAGING_DEPOSIT_MANAGER_SENTINEL_ID,
	PRODUCTION_OPENQ_SENTINEL_ID,
	PRODUCTION_CLAIM_MANAGER_SENTINEL_ID,
	PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID,
	LOCAL_EVENT_LISTENER_ID
};