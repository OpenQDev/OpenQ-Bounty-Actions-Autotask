const { ethers } = require("ethers");
const getBountyTypeFromHexOrString = require("./utils/getBountyTypeFromHexOrString");
const decodeSupportingDocsData = (encodedData, bountyType) => {
  const trueBountyType = getBountyTypeFromHexOrString(bountyType);

  let abiCoder = new ethers.utils.AbiCoder();
  switch (trueBountyType) {
    case "0": {
		return abiCoder.decode(["bool"], encodedData);
    }

    case "3": {
		return abiCoder.decode(["uint256", "bool"], encodedData);
    }
  }
};

module.exports = decodeSupportingDocsData;
