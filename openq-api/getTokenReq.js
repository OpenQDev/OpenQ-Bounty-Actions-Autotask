const openqIndexableTokens = require("../constants/openq-polygon-mainnet-indexable.json");
const { ethers } = require("ethers");

const getTokenReq = (address, volume) => {
  const formattedVolume = ethers.utils.formatUnits(volume, 0);
  const checkSummedAddress = ethers.utils.getAddress(address);
  const lowerCaseAddress = address.toLowerCase();
  let token = {};
  if (openqIndexableTokens[checkSummedAddress]) {
    token = openqIndexableTokens[checkSummedAddress];
  } else if (openqIndexableTokens[lowerCaseAddress]) {
    token = openqIndexableTokens[lowerCaseAddress];
  } else {
    token = {
      chainId: 137,
      name: `${address.substring(0, 5)}
			...
			${address.substring(39)}`,
      symbol: "CUSTOM",
      decimals: 18,
      address: checkSummedAddress,
      path: "/crypto-logos/ERC20.svg",
    };
  }
  try {
    const tokenAddress = token.address;
    const returnToken = {
      network: "polygon-pos",
      tokenVolumes: {
        [tokenAddress]: {
          volume: formattedVolume,
          decimals: token.decimals,
        },
      },
    };
    return returnToken;
  } catch (err) {
    return {};
  }
};
module.exports = getTokenReq;
