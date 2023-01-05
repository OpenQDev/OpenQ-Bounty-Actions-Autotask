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
		console.log('matchReasons', matchReasons);
		console.log('matchReasons[0].signature', matchReasons[0].signature);

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
			const invoiceUrl = getInvoiceUrl(id, event);
			console.log('invoiceUrl', invoiceUrl);
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
							await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[i].params, pat);
						} catch (error) {
							console.error(error);
						}
					}
					else {
						openQApiResult = await bountyUpdater(eventType, baseUrl, openqApiSecret, matchReasons[i].params, pat);
					}

				}

			}
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