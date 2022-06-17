const axios = require('axios');
const postGithubComment = require('./github-bot');
const { getBaseUrl } = require('./utils');

const main = async (event) => {
	return new Promise(async (resolve, reject) => {
		const payload = event.request.body;
		const { matchReasons, sentinel } = payload;
		const { id } = sentinel;
		const eventType = matchReasons[0].signature.replace(/ *\([^)]*\) */g, "");

		let baseUrl = getBaseUrl(id);

		await postGithubComment(baseUrl, eventType);
	});
};

module.exports = main;