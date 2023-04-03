const GET_SUBGRAPH_BOUNTY = `query ($id: ID!) { bounty(id: $id){
	tierWinners}
  }`;
  module.exports = GET_SUBGRAPH_BOUNTY;