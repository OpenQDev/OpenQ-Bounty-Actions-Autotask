const UPDATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$tvl: Float
		$tvc: Float
	) {
		updateBountyValuation(
			address: $address
			type: $type
			tvl: $tvl
			tvc: $tvc
		) {
			address
		}
	}
`;


module.exports = UPDATE_BOUNTY;
