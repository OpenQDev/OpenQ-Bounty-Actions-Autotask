const { GET_SUBGRAPH_BOUNTY } = require("./graphql");
const axios = require("axios");
const getSubgraphBounty = async (id) => {
  try {
    const result = await axios.post(
      "http://graph_node:8000/subgraphs/name/openqdev/openq",
      { query: GET_SUBGRAPH_BOUNTY, variables: { id: id.toLowerCase() } }
    );
    return result.data
  } catch (error) {
    console.log(error);
  }
};
module.exports = getSubgraphBounty;
