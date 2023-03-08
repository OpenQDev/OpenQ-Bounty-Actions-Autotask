
const openqIndexableTokens = require('../constants/openq-polygon-mainnet-indexable.json');
const  { ethers } = require('ethers' );

  
  function getTokenReq(address, volume) {
  const formattedVolume = ethers.utils.formatUnits(volume, 0);
    const checkSummedAddress = ethers.utils.getAddress(address);
 let token={}
    if (openqIndexableTokens[checkSummedAddress]) {
      token =  openqIndexableTokens[checkSummedAddress];
    }
    else{
    token =  {
      chainId: 137,
      name: `${address.substring(0, 5)}
			...
			${address.substring(39)}`,
      symbol: 'CUSTOM',
      decimals: 18,
      address: checkSummedAddress,
      path: '/crypto-logos/ERC20.svg',
    };
    }
	const tokenAddress = token.address;
	const returnToken=  {
		tokenVolumes: {
			[tokenAddress]: {
      volume: formattedVolume,
			decimals: token.decimals},
		}
	};
  return returnToken;
  }
  module.exports = getTokenReq;
