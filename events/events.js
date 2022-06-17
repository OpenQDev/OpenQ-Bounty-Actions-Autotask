require('dotenv').config();
const { STAGING_SENTINEL_ID } = require('../utils');

const BountyCreated = {
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
		GITHUB_BOT_SECRET: process.env.GITHUB_BOT_SECRET,
		OPENQ_API_SECRET: process.env.OPENQ_API_SECRET
	}
};

const TokenDepositReceived = {
	request: {
		body: {
			sentinel: {
				id: STAGING_SENTINEL_ID
			},
			matchReasons: [
				{
					params: {
						bountyId: "I_kwDOGWnnz85L2NI_",
						bountyAddress: "0x94e09468616365256F11F4544e65cE0C70ee624b",
						tokenAddress: "0x43209468616365256F11F4544e65cE0C70ee624b",
						volume: 1000
					},
					signature: "TokenDepositReceived(bytes32,indexed address,string,string,address,uint256,address,uint256,uint256)"
				}
			]
		}
	},
	secrets: {
		GITHUB_BOT_SECRET: process.env.GITHUB_BOT_SECRET,
		OPENQ_API_SECRET: process.env.OPENQ_API_SECRET
	}
};

const DepositRefunded = {
	request: {
		body: {
			sentinel: {
				id: STAGING_SENTINEL_ID
			},
			matchReasons: [
				{
					params: {
						bountyId: "I_kwDOGWnnz85L2NI_",
						bountyAddress: "0x94e09468616365256F11F4544e65cE0C70ee624b",
						tokenAddress: "0x43209468616365256F11F4544e65cE0C70ee624b",
						volume: 1000
					},
					signature: "DepositRefunded(bytes32,string,indexed address,string,uint256,address,uint256)"
				}
			]
		}
	},
	secrets: {
		GITHUB_BOT_SECRET: process.env.GITHUB_BOT_SECRET,
		OPENQ_API_SECRET: process.env.OPENQ_API_SECRET
	}
};

const BountyClosed = {
	request: {
		body: {
			sentinel: {
				id: STAGING_SENTINEL_ID
			},
			matchReasons: [
				{
					params: {
						bountyId: "I_kwDOGWnnz85L2NI_",
						bountyAddress: "0x94e09468616365256F11F4544e65cE0C70ee624b",
						closerData: "https://github.com/OpenQDev/OpenQ-TestRepo/pull/364"
					},
					signature: "DepositRefunded(bytes32,string,indexed address,string,uint256,address,uint256)"
				}
			]
		}
	},
	secrets: {
		GITHUB_BOT_SECRET: process.env.GITHUB_BOT_SECRET,
		OPENQ_API_SECRET: process.env.OPENQ_API_SECRET
	}
};

module.exports = { BountyCreated, TokenDepositReceived, DepositRefunded, BountyClosed };