const CREATE_REPOSITORY = `
	mutation Mutation(
		$organizationId: String!
		$repositoryId: String!
		$bountyId: String!
	) {
		createRepository(
			organizationId: $organizationId
			repositoryId: $repositoryId
			bountyId: $bountyId
		) {
			organizationId
			repositoryId
			bountyId
		}
	}
`;

module.exports = CREATE_REPOSITORY;
