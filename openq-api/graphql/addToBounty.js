const ADD_TO_BOUNTY = `
	mutation Mutation(
		$address: String!
		$tokenBalance: JSON!
		$add: Boolean!
	) {
		addToTvl(
			address: $address
			tokenBalance: $tokenBalance
			add: $add
		) {
			address
		}
	}
`;

module.exports = ADD_TO_BOUNTY;
