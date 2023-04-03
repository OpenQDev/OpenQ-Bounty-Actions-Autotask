const { ethers } = require("ethers");
const getBountyTypeFromHexOrString = require("./utils/getBountyTypeFromHexOrString");
const decodeData = (encodedData, bountyType) => {
  let abiCoder = new ethers.utils.AbiCoder();
  
  const trueBountyType = getBountyTypeFromHexOrString(bountyType);
 
  switch (trueBountyType) {
    case "0": {
      const fundingGoalBountyParamsEncoded = encodedData;
      const decodedData = abiCoder.decode(
        [
           "bool",
          "address",
          "uint256",
          "bool",
          "bool",
          "bool",
          "string",
          "string",
          "string",
        ],
        fundingGoalBountyParamsEncoded
      );
      const issuerExternalUserId = decodedData[6];
      return issuerExternalUserId;
    }
    case "1": {
      const fundingGoalBountyParamsEncoded = encodedData;
      const decodedData = abiCoder.decode(
        [
          "address",
          "uint256",
          "bool",
          "address",
          "uint256",
          "bool",
          "bool",
          "bool",
          "string",
          "string",
          "string",
        ],
        fundingGoalBountyParamsEncoded
      );

      const issuerExternalUserId = decodedData[8];
      return issuerExternalUserId;
    }
    case "2": {
      const fundingGoalBountyParamsEncoded = encodedData;
      const decodedData = abiCoder.decode(
        [
          "uint256[]",
          "bool",
          "address",
          "uint256",
          "bool",
          "bool",
          "bool",
          "string",
          "string",
          "string",
        ],
        fundingGoalBountyParamsEncoded
      );

      const issuerExternalUserId = decodedData[7];
      return issuerExternalUserId;
    }

    case "3": {
      const fundingGoalBountyParamsEncoded = encodedData;
      const decodedData = abiCoder.decode(
        [
          "uint256[]",
          "address",
          "bool",
          "bool",
          "bool",
          "string",
          "string",
          "string",
        ],
        fundingGoalBountyParamsEncoded
      );
      const issuerExternalUserId = decodedData[5];
      return issuerExternalUserId;
    }
  }
};

module.exports = decodeData;
