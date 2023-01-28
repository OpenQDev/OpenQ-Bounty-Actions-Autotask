const {ethers} = require('ethers');
const decodeData = (encodedData, bountyType)=>{
	console.log(bountyType);
		let abiCoder = new ethers.utils.AbiCoder();
const type=  ethers.utils.formatEther( bountyType )
console.log(type);
switch (bountyType.hex) {
	case "0x00":
	  {
const  fundingGoalBountyParamsEncoded = encodedData;
const decodedData= abiCoder.decode(
		  ['bool', 'address', 'uint256', 'bool', 'bool', 'bool', 'string', 'string', 'string'],
		  fundingGoalBountyParamsEncoded
		);
		const issuerExternalUserId = decodedData[6];
		return issuerExternalUserId
	  }
	case "0x01":{
const   fundingGoalBountyParamsEncoded= encodedData;
const decodedData= abiCoder.decode(
		[	
			'address',
			'uint256',
			'bool',
			'address',
			'uint256',
			'bool',
			'bool',
			'bool',
			'string',
			'string',
			'string',
		  ],
		  fundingGoalBountyParamsEncoded
		);
		
		const issuerExternalUserId = decodedData[8];
		  return issuerExternalUserId
	  }
	case "0x02":{
		const  fundingGoalBountyParamsEncoded = encodedData;
		const decodedData =abiCoder.decode(
				[	
					'uint256[]', 'bool', 'address', 'uint256', 'bool', 'bool', 'bool', 'string', 'string', 'string'
				  ],
				  fundingGoalBountyParamsEncoded
				);
				
				const issuerExternalUserId = decodedData[7];
				  return issuerExternalUserId
			  }
	 
	case "0x03":
	  {
		const   fundingGoalBountyParamsEncoded= encodedData;
			const decodedData =  abiCoder.decode(
				['uint256[]', 'address', 'bool', 'bool', 'bool', 'string', 'string', 'string'],
				  fundingGoalBountyParamsEncoded
				);
				const issuerExternalUserId = decodedData[5];
				  return issuerExternalUserId
	  }
	 }
	}


			module.exports = decodeData;