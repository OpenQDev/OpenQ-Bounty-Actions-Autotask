const axios = require("axios");
const getValueFromBalanceImpl = require("./getValueFromBalance.js");
const createNewBountyImpl = require("./createNewBounty");
const getIssueImpl = require("./getIssue");
const getTokenReq = require("./getTokenReq");
const updateBountyValuationImpl = require("./updateBountyValuation");
const getCategory = require("./getCategory");
const decodeData = require("./decodeData");
const getBudgetTokenBalance = require("./getBudgetTokenBalance");
const { ethers } = require("ethers");

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
  coinApiUrl,
  getIssue = getIssueImpl,
  createNewBounty = createNewBountyImpl,
  updateBountyValuation = updateBountyValuationImpl,
  getValueFromBalance = getValueFromBalanceImpl
) => {
  return new Promise(async (resolve, reject) => {

    try {
      let result = null;
      switch (eventType) {
      
        case "BountyCreated": {
          
          const type = ethers.BigNumber.from(bountyType).toString();
          const { bountyAddress, bountyId, organization, bountyType, data } =
            params;
          const decodedInitData = decodeData(data, type);
          const { budgetTokenAddress, volume } =
            getBudgetTokenBalance(decodedInitData, type);
          const { issuerExternalUserId } = decodedInitData;
          const tokenReq = getTokenReq(budgetTokenAddress, volume);
          const budget = await getValueFromBalance(tokenReq, coinApiUrl);
          let category;

          let bountyRepositoryId, bountyTitle;
          try {
            const { labels, repositoryId, title } = await getIssue(
              bountyId,
              pat
            );
            bountyRepositoryId = repositoryId;
            bountyTitle = title;
            category = getCategory(labels);
          } catch (err) {
            console.log(err);
          }

          try {
            result = await createNewBounty(
              baseUrl,
              openqApiSecret,
              bountyAddress,
              bountyId,
              organization,
              bountyRepositoryId,
              category,
              type,
              issuerExternalUserId,
              bountyTitle,
              budget
            );
          } catch (error) {
            console.error("error creating new bounty", JSON.stringify(error));
            reject(new Error("ERROR CREATING NEW BOUNTY"));
          }

          return resolve(result);
        }
        case "TokenDepositReceived": {
          const { volume, tokenAddress, bountyAddress } = params;
          try {
            const tokenReq = getTokenReq(tokenAddress, volume);
            const total = await getValueFromBalance(tokenReq, coinApiUrl);
            result = await updateBountyValuation(baseUrl, openqApiSecret, {
              tvc: 0,
              tvl: total,
              address: bountyAddress,
            });
          } catch (error) {
            console.error(
              "error funding bounty",
              JSON.stringify(error),
              bountyAddress,
              tokenAddress
            );
            //	reject(new Error('ERROR UPDATING BOUNTY'));
          }
          return resolve(result);
        }
        case "DepositRefunded": {
          const { bountyAddress, tokenAddress, volume } = params;
          try {
            const tokenReq = getTokenReq(tokenAddress, volume);
            const total = await getValueFromBalance(tokenReq, coinApiUrl);
            result = await updateBountyValuation(baseUrl, openqApiSecret, {
              tvc: 0,
              tvl: total * -1,
              address: bountyAddress,
            });
          } catch (error) {
            console.error("ERROR UPDATING BOUNTY", JSON.stringify(error));
            reject(new Error("Unknown Event"));
          }
          return resolve(result);
        }
        case "TokenBalanceClaimed": {
          const { bountyAddress, tokenAddress, volume } = params;

          try {
            const tokenReq = getTokenReq(tokenAddress, volume);
            const total = await getValueFromBalance(tokenReq, coinApiUrl);
            result = await updateBountyValuation(baseUrl, openqApiSecret, {
              tvc: total,
              tvl: 0,
              address: bountyAddress,
            });
          } catch (error) {
            console.log(error);
          }
          return resolve(result);
        }
        case "BountyClosed": {
          return resolve({});
        }
        default: {
          return resolve({ error: `Unknown Event: ${eventType}` });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = bountyUpdater;
