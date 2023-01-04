const { getBaseUrl, getBotUrl, getOpenQApiSecret, getGithubBotSecret, getInvoiceUrl } = require('./utils');
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
		console.log('matchReasons', matchReasons)
		console.log('matchReasons[0].signature', matchReasons[0].signature)
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");

		let baseUrl;
		let botUrl;
		let openqApiSecret;
		let githubBotSecret;
		let pat;
		try {
			baseUrl = getBaseUrl(id);
			botUrl = getBotUrl(id);
			openqApiSecret = getOpenQApiSecret(id, event);
			githubBotSecret = getGithubBotSecret(id, event);
			invoiceUrl = getInvoiceUrl(id, event)
			console.log('invoiceUrl', invoiceUrl)
			pat = event.secrets.PAT||process.env.PAT;
		} catch (error) {
			reject(error);
		}

		try {
			openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[0].params, pat);
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