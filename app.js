const express = require('express');
const main = require('./main');
require('dotenv').config();

const events = require('./events/events');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
	try {
		const result = await main(req.body);

		// On local we mimic the return JSON from OpenZeppelin Autotask
		// The result in production is stringified, so we do that here
		// https://docs.openzeppelin.com/defender/autotasks#webhook-handler
		const autotaskResult = {
			'autotaskRunId': '37a91eba-9a6a-4404-95e4-38d178ba69ed',
			'autotaskId': '19ef0257-bba4-4723-a18f-67d96726213e',
			'trigger': 'webhook',
			'status': 'success',
			'createdAt': '2021-02-23T18:49:14.812Z',
			'encodedLogs': 'U1RBU...cwkK',
			'result': JSON.stringify(result),
			'requestId': 'e7979150-44d3-4021-926c-9d9679788eb8'
		};

		console.log(result);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = app;