require('dotenv').config();
const { STAGING_SENTINEL_ID } = require('../utils');

const BountyCreatedEvent = {
	request: {
		body: {
			sentinel: {
				id: STAGING_SENTINEL_ID
			},
			matchReasons: [
				{
					params: {
						bountyId: "I_kwDOGWnnz85L2NI_",
						organization: "MDEyOk9yZ2FuaXphdGlvbjc3NDAyNTM4",
						issuerAddress: "0x46e09468616365256F11F4544e65cE0C70ee624b",
						bountyAddress: "0x94e09468616365256F11F4544e65cE0C70ee624b",
						bountyMintTime: 143434343
					},
					signature: "BountyCreated(string,string,address,indexed address,uint256)"
				}
			]
		}
	},
	secrets: {
		GITHUB_BOT_SECRET: process.env.GITHUB_BOT_SECRET
	}
};

module.exports = { BountyCreatedEvent };