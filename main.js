const { getBaseUrl, getBotUrl, getOpenQApiSecret, getGithubBotSecret, getInvoiceUrl, getCoinApiUrl } = require('./utils');
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

		try {
			const getEventType = (signature) => {
				const eventType = signature.replace(/ *\([^)]*\) */g, "");
				return eventType;
			};
			const eventType = getEventType(matchReasons[0].signature);
			const isClaim = eventType === 'ClaimSuccess';

			if (isClaim) {
				for (let i = 0; i < matchReasons.length; i++) {
					const eventType = getEventType(matchReasons[i].signature);
					if (eventType === 'ClaimSuccess') {
						try {
							await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[i].params, pat, invoiceUrl);

						} catch (error) {
							console.error(error);
						}
					}
					else {
						openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[i].params, pat, invoiceUrl);
					}

				}

			}
			else{openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[0].params, pat, invoiceUrl);}
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