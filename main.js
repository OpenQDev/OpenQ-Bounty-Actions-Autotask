const { getBaseUrl, getOpenQApiSecret, getGithubBotSecret } = require('./utils');
const postGithubComment = require('./github-bot/postGithubComment');
const bountyUpdater = require('./openq-api/bountyUpdater');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const { id } = sentinel;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
		const baseUrl = getBaseUrl(id);
		const openqApiSecret = getOpenQApiSecret(id, event);
		const githubBotSecret = getGithubBotSecret(id, event);

		try {
			const githubBotResult = await postGithubComment(baseUrl, eventType, githubBotSecret, matchReasons[0].params);
		} catch (error) {
			console.error(error);
		}

		try {
			const openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[0].params);
		} catch (error) {
			reject(error);
		}

		resolve({ openQApiResult });
	});
};

module.exports = main;