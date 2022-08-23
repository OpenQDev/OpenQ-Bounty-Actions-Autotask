const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$bountyId: String!
		$organizationId: String!
		$type: String!
		$category: String
	) {
		createBounty(
			address: $address
			bountyId: $bountyId
			organizationId: $organizationId
			type: $type
			category: $category
		) {
			address
			bountyId
			organizationId
			type
		}
	}
`;

module.exports = CREATE_BOUNTY;
