const {ethers} = require('ethers');
const decodeData = (encodedData, bountyType)=>{
	console.log(bountyType);
		let abiCoder = new ethers.utils.AbiCoder();
const type = parseInt(bountyType);
switch (type) {
	case 0:
	  {
const  [, fundingGoalBountyParamsEncoded] = encodedData;
	return abiCoder.decode(
		  ['bool', 'address', 'uint256', 'bool', 'bool', 'bool', 'string', 'string', 'string'],
		  fundingGoalBountyParamsEncoded
		);
	  }
	case 1:{
const  [, fundingGoalBountyParamsEncoded] = encodedData;
	return abiCoder.decode(
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
	  }
	case 2:{
		const  [, fundingGoalBountyParamsEncoded] = encodedData;
			return abiCoder.decode(
				[	
					'uint256[]', 'bool', 'address', 'uint256', 'bool', 'bool', 'bool', 'string', 'string', 'string'
				  ],
				  fundingGoalBountyParamsEncoded
				);
			  }
	 
	case 3:
	  {
		const  [, fundingGoalBountyParamsEncoded] = encodedData;
			return abiCoder.decode(
				['uint256[]', 'address', 'bool', 'bool', 'bool', 'string', 'string', 'string'],
				  fundingGoalBountyParamsEncoded
				);
	  }
	 }
	}


			module.exports = decodeData;