const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$organizationId: String!
	) {
		createBounty(
			address: $address
			organizationId: $organizationId
		) {
			address
			organizationId
		}
	}
`;

module.exports = CREATE_BOUNTY;
