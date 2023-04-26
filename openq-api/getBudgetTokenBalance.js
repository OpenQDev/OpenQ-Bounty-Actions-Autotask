const { ethers } = require("ethers");

const getBudgetTokenBalance = (decodedInitData, type) => {
  const {
    tierVolumes,
    payoutTokenAddress,

    fundingGoalTokenAddress,
    fundingGoalBigNumberVolumeInWei,
  } = decodedInitData;
  if (type === "2" || type === "3") {
    const bigNumberEmpty = ethers.BigNumber.from(0);
    const updatedTierVolumes = tierVolumes.reduce((accum, elem) => {
      const bigNumberElem = ethers.BigNumber.from(elem);
      return accum.add(bigNumberElem);
    }, bigNumberEmpty);
    return {
      budgetTokenAddress: payoutTokenAddress,
      volume: updatedTierVolumes.toString(),
    };
  } else
    return {
      budgetTokenAddress: fundingGoalTokenAddress,
      volume: fundingGoalBigNumberVolumeInWei.toString(),
    };
};
module.exports = getBudgetTokenBalance;
