const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$bountyId: String!
		$organizationId: String!
		$type: String!
		$repositoryId: String!
		$category: String
		$creatingUserId: String
	) {
		createBounty(
			address: $address
			bountyId: $bountyId
			organizationId: $organizationId
			type: $type
			repositoryId: $repositoryId
			category: $category
			creatingUserId: $creatingUserId
		) {
			address
			repositoryId
			bountyId
			organizationId
			type
		}
	}
`;

module.exports = CREATE_BOUNTY;
