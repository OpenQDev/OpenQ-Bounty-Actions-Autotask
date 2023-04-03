const { getBaseUrl, getBotUrl, getOpenQApiSecret, getGithubBotSecret, getInvoiceUrl, getCoinApiUrl, getEventType } = require('./utils');
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

		let baseUrl;
		let botUrl;
		let invoiceUrl;
		let coinApiUrl
		let openqApiSecret;
		let githubBotSecret;
		let pat;
		try {
			baseUrl = getBaseUrl(id);
			botUrl = getBotUrl(id);
			openqApiSecret = getOpenQApiSecret(id, event);
			githubBotSecret = getGithubBotSecret(id, event);
			invoiceUrl = getInvoiceUrl(id, event);
			coinApiUrl = getCoinApiUrl(id, event);
			pat = event.secrets.PAT || process.env.PAT;
		} catch (error) {
			reject(error);
		}

		let openQApiResults = [];
		try {
			for (matchReason of matchReasons) {
				const eventType = getEventType(matchReason.signature);
				const { params } = matchReason
				let openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, params, pat, invoiceUrl, coinApiUrl);
				openQApiResults.push(openQApiResult)
			}
		} catch (error) {
			reject(error);
		}

		resolve({ openQApiResults });
	});
};

module.exports = main;