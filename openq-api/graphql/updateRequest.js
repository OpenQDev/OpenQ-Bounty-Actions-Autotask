const UPDATE_REQUEST = `
  mutation UpdateRequest(
$bountyAddress: String!,
$requestingUserId: String!,
$state: String!){
	updateRequestStateToClosed(
		bountyAddress: $bountyAddress,
		requestingUserId: $requestingUserId,
		state: $state
	) {
id	}
}`;
module.exports = UPDATE_REQUEST;
