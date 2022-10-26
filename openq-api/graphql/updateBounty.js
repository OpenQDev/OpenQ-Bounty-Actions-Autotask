const UPDATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$tvl: Float
		$tvc: Float
	) {
		updateBounty(
			address: $address
			tvl: $tvl
			tvc: $tvc
		) {
			address
		}
	}
`;

module.exports = UPDATE_BOUNTY;
