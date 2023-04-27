const UPDATE_BOUNTY_VALUATION = `
	mutation UpdateBountyValuation(
		$address: String!
		$tvl: Float
		$tvc: Float
		$budgetValue: Float
	) {
		updateBountyValuation(
			address: $address
			tvl: $tvl
			tvc: $tvc
			budgetValue: $budgetValue
		) {
			address
			tvl
			budgetValue
			tvc
		}
	}
`;


module.exports = UPDATE_BOUNTY_VALUATION;
