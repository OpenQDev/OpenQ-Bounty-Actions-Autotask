const postGithubComment = require('./github-bot/postGithubComment');
const { getBaseUrl } = require('./utils');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		console.log(event);
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const { id } = sentinel;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");

		const baseUrl = getBaseUrl(id);

		await postGithubComment(baseUrl, eventType, event.secrets.GITHUB_BOT_SECRET, matchReasons[0].params);
	});
};

module.exports = main;