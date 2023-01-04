const axios = require('axios');

const createNewBountyImpl = require('./createNewBounty');
const getIssueImpl = require('./getIssue');
const addToBountyImpl = require('./addToBounty');
const getCategory = require("./getCategory");
const { ethers } = require("ethers");
const addToValueClaimed = require('./addToValueClaimed ');
const createNewRepository = require('./createNewRepository');

/**
 * bountyUpdater takes in an event type and responds by creating a new Bounty document in OpenQ-API if it is a 
 * BountyCreated event, or triggering an update of the bounty's TVL if it is a TokenDepositReceived or DepositRefunded event
 * @param {The type of event} eventType 
 * @param { Staging or Production } baseUrl 
 * @param { Shared secret between this backend service and the OpenQ-API } openqApiSecret 
 * @param { Depending on event, will be different } params 
 * @returns 
 */
const bountyUpdater = async (
	eventType,
	baseUrl,
	openqApiSecret,
	params,
	pat,
	invoiceUrl,
	getIssue = getIssueImpl,
	createNewBounty = createNewBountyImpl,
	addToBounty = addToBountyImpl
) => {
	return new Promise(async (resolve, reject) => {
		try {
			let result = null;
			console.log('eventType', eventType)
			switch (eventType) {
				case 'BountyCreated': {
					const { bountyAddress, bountyId, organization, bountyType } = params;
					const type = ethers.BigNumber.from(bountyType).toString();
					let category;

					let bountyRepositoryId;
					try {
						const { labels, repositoryId } = await getIssue(bountyId, pat);
						bountyRepositoryId = repositoryId;
						category = getCategory(labels);
					} catch (err) {
						console.log(err);
					}

					try {
						result = await createNewBounty(baseUrl, openqApiSecret, bountyAddress, bountyId, organization, bountyRepositoryId, category, type);
					} catch (error) {
						console.error('error creating new bounty', JSON.stringify(error));
						reject(new Error('ERROR CREATING NEW BOUNTY'));
					}

					const isContest = bountyType == 2 || bountyType == 3;
					if (isContest) {
						try {
							result = await createNewRepository(baseUrl, openqApiSecret, organization, bountyRepositoryId, bountyId);
						} catch (error) {
							console.error('error creating new contest', JSON.stringify(error));
							reject(new Error('ERROR CREATING NEW CONTEST'));
						}
					}

					return resolve(result);
				}
				case 'TokenDepositReceived': {
					const { volume, tokenAddress, bountyAddress } = params;
					try {
						result = await addToBounty(baseUrl, openqApiSecret, { volume: parseFloat(ethers.utils.formatUnits(volume, 0)), tokenAddress }, bountyAddress, true);
					} catch (error) {
						console.error('error creating new bounty', JSON.stringify(error), bountyAddress, tokenAddress);
						reject(new Error('ERROR UPDATING BOUNTY'));
					}
					return resolve(result);
				}
				case 'DepositRefunded': {
					const { bountyAddress, tokenAddress, volume } = params;
					try {
						result = await addToBounty(baseUrl, openqApiSecret, { volume: parseFloat(ethers.utils.formatUnits(volume, 0)), tokenAddress }, bountyAddress, false);
					} catch (error) {
						console.error('ERROR UPDATING BOUNTY', JSON.stringify(error));
						reject(new Error('Unknown Event'));
					}
					return resolve(result);
				}
				case 'TokenBalanceClaimed': {
					const { bountyAddress, tokenAddress, volume } = params;
					try {
					const message = await axios.post(`${invoiceUrl}/email`, params);
					console.log(message)
					}
					catch (error) {
						console.log(error);
					}
					try {
						result = await addToValueClaimed(baseUrl, openqApiSecret, { volume: ethers.utils.formatUnits(volume, 0), tokenAddress, address: bountyAddress, add: true });
					} catch (error) {
						console.error('ERROR UPDATING BOUNTY', JSON.stringify(error));
						reject(new Error('Unknown Event'));
					}
					return resolve(result);
				}
				case 'BountyClosed': {
					return resolve({});
				}
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