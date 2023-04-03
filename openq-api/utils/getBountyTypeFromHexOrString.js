const getBountyTypeFromStringOrHex = (bountyType)=>{
	const {hex} = bountyType;
	if(bountyType){
	switch (hex) {
		case "0x00":
			return "0"
		case "0x01":
			return "1"
		case "0x02":
			return "2"
		case "0x03":
			return "3"
		default:
			return "0"}
	}
}

module.exports = getBountyTypeFromStringOrHex;