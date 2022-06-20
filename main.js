const { getBaseUrl } = require('./utils');
const postGithubComment = require('./github-bot/postGithubComment');
const bountyUpdater = require('./openq-api/bountyUpdater');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const { id } = sentinel;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");
		const baseUrl = getBaseUrl(id);

		// const githubBotResult = await postGithubComment(baseUrl, eventType, event.secrets.GITHUB_BOT_SECRET, matchReasons[0].params);
		try {
			const openQApiResult = await bountyUpdater(eventType, baseUrl, event.secrets.OPENQ_API_SECRET, matchReasons[0].params);
			resolve({ openQApiResult });
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = main;