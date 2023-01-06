const UPDATE_BOUNTY_VALUATION = `
	mutation UpdateBountyValuation(
		$address: String!
		$tvl: Float
		$tvc: Float
	) {
		updateBountyValuation(
			address: $address
			tvl: $tvl
			tvc: $tvc
		) {
			address
		}
	}
`;


module.exports = UPDATE_BOUNTY_VALUATION;
