 const GET_CATEGORY = `query ($bountyId: ID!) {
  node(id: $bountyId) {
    ... on Issue {
	id
      labels(first: 1) {        
        nodes {
          name
        }
      }
    }
  }
}`

module.exports=GET_CATEGORY