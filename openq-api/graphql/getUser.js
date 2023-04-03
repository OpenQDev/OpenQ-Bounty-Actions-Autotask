const GET_USER = `query($github: String) {
	user(github: $github){
		id
	}
}`

module.exports = GET_USER