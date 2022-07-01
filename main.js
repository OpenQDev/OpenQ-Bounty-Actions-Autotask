const { getBaseUrl, getBotUrl, getOpenQApiSecret, getGithubBotSecret } = require('./utils');
const postGithubComment = require('./github-bot/postGithubComment');
const bountyUpdater = require('./openq-api/bountyUpdater');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const { id } = sentinel;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
		const baseUrl = getBaseUrl(id);
		const botUrl = getBotUrl(id);
		const openqApiSecret = getOpenQApiSecret(id, event);
		const githubBotSecret = getGithubBotSecret(id, event);
		let openQApiResult;
		let githubBotResult;

		try {
			openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[0].params);
			console.log(openQApiResult);
		} catch (error) {
			reject(error);
		}

		try {
			githubBotResult = await postGithubComment(botUrl, eventType, githubBotSecret, matchReasons[0].params);
		} catch (error) {
			console.error(error);
		}

		resolve({ openQApiResult, githubBotResult });
	});
};

module.exports = main;