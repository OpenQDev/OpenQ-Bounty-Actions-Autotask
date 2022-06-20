const createNewBounty = require('./createNewBounty');

/**
 * bountyUpdater takes in an event type and responds by creating a new Bounty document in OpenQ-API if it is a 
 * BountyCreated event, or triggering an update of the bounty's TVL if it is a TokenDepositReceived or DepositRefunded event
 * @param {The type of event} eventType 
 * @param { Staging or Production } baseUrl 
 * @param { Shared secret between this backend service and the OpenQ-API } openqApiSecret 
 * @param { Depending on event, will be different } params 
 * @returns 
 */
const bountyUpdater = async (eventType, baseUrl, openqApiSecret, params) => {
	return new Promise(async (resolve, reject) => {
		try {
			let result = null;
			switch (eventType) {
				case 'BountyCreated':
					const { bountyAddress, bountyId, organization } = params;
					try {
						result = await createNewBounty(baseUrl, openqApiSecret, bountyAddress, bountyId, organization);
					} catch (error) {
						console.error('error creating new bounty', JSON.stringify(error));
						reject(new Error('Unknown Event'));
					}
					return resolve({ bountyAddress, bountyId, organization });
				default: {
					reject(new Error('Unknown Event'));
				}
			}
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = bountyUpdater;