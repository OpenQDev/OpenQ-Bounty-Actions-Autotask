const CREATE_CONTEST = `
	mutation Mutation(
		$organizationId: String!
		$repositoryId: String!
		$bountyId: String!
	) {
		createContest(
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

module.exports = CREATE_CONTEST;
