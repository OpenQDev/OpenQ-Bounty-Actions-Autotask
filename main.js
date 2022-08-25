const { getBaseUrl, getBotUrl, getOpenQApiSecret, getGithubBotSecret } = require('./utils');
const bountyUpdaterImpl = require('./openq-api/bountyUpdater');
const postGithubCommentImpl = require('./github-bot/postGithubComment');

const main = async (
	event,
	bountyUpdater = bountyUpdaterImpl,
	postGithubComment = postGithubCommentImpl) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const { id } = sentinel;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
		const baseUrl = getBaseUrl(id);
		const botUrl = getBotUrl(id);

		let openqApiSecret;
		let githubBotSecret;
		try {
			openqApiSecret = getOpenQApiSecret(id, event);
			githubBotSecret = getGithubBotSecret(id, event);
		} catch (error) {
			reject(error);
		}

		let openQApiResult;
		let githubBotResult;
		try {
			openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[0].params);
		} catch (error) {
			reject(error);
		}

		// try {
		// 	githubBotResult = await postGithubComment(botUrl, eventType, githubBotSecret, matchReasons[0].params);
		// } catch (error) {
		// 	console.error(error.response.data.errors);
		// }

		resolve({ openQApiResult });
	});
};

module.exports = main;