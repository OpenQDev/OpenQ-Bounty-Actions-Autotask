const STAGING_OPENQ_SENTINEL_ID = "9b6f157e-d6b8-486b-97b8-ba6a0282b235";
const STAGING_CLAIM_MANAGER_SENTINEL_ID = "4791ed31-f518-4234-9840-5a6fa7c55139";
const STAGING_DEPOSIT_MANAGER_SENTINEL_ID = "066d9aab-b518-4dbc-ad03-db7a5554747b";
const PRODUCTION_OPENQ_SENTINEL_ID = "";
const PRODUCTION_CLAIM_MANAGER_SENTINEL_ID = "";
const PRODUCTION_CLAIM_DEPOSIT_SENTINEL_ID = "";

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