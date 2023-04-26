const { ethers } = require("ethers");
const decodeData = (encodedData, type) => {
  let abiCoder = new ethers.utils.AbiCoder();
  switch (type) {
    case "0": {
      const [
        hasFundingGoal,
        fundingGoalTokenAddress,
        fundingGoalBigNumberVolumeInWei,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      ] = abiCoder.decode(
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
        encodedData
      );
      return {
        hasFundingGoal,
        fundingGoalTokenAddress,
        fundingGoalBigNumberVolumeInWei,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      };
    }
    case "1": {
      const [
        payoutTokenAddress,
        payoutBigNumberVolumeInWei,
        hasFundingGoal,
        fundingGoalTokenAddress,
        fundingGoalBigNumberVolumeInWei,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      ] = abiCoder.decode(
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
        encodedData
      );

      return {
        payoutTokenAddress,
        payoutBigNumberVolumeInWei,
        hasFundingGoal,
        fundingGoalTokenAddress,
        fundingGoalBigNumberVolumeInWei,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      };
    }
    case "2": {
      const [
        tiers,
        hasFundingGoal,
        fundingGoalTokenAddress,
        fundingGoalBigNumberVolumeInWei,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      ] = abiCoder.decode(
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
        encodedData
      );

      return {
        tiers,
        hasFundingGoal,
        fundingGoalTokenAddress,
        fundingGoalBigNumberVolumeInWei,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      };
    }

    case "3": {
      const [
        tierVolumes,
        payoutTokenAddress,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      ] = abiCoder.decode(
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
        encodedData
      );
      return {
        tierVolumes,
        payoutTokenAddress,
        invoiceable,
        kycRequired,
        supportingDocumentsRequired,
        issuerExternalUserId,
        alternativeName,
        alternativeLogo,
      };
    }
  }
};

module.exports = decodeData;
