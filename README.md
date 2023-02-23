# OpenQ-OZ-Claim-Autotask

## Pushing to Staging + Production

### Add API Key+Secret

Add your admin API_KEY and API_SECRET to your .env file

### Run yarn push:staging or push:production

## Running Locally

For booting locally, we wrap the `main.js` method in an express wrapper.

### Step 1: Re-Add Dev Dependencies to `package.json`

Due to body size limits on OZ tasks, the following dev deps are only needed for local development, but cannot be included in the `node_modules/` folder at the time of pushing code.

```json
	"devDependencies": {
		"dotenv": "14.3.2",
		"express": "4.17.2",
		"jest": "27.4.7",
		"nodemon": "2.0.15",
		"ethers": "5.7.0"
	}
```

### Step 2: Install Dependencies

`yarn`

### Step 3: Start on `http://localhost:8070`

`yarn start:dev`

### Step 4: Hit http://localhost:8070?event={event}

Choose an event to trigger with a query param:

- http://localhost:8070?event=BountyCreated
- http://localhost:8070?event=TokenDepositReceived
- http://localhost:8070?event=DepositRefunded
- http://localhost:8070?event=BountyClosed

The mock events are made to look identical to Sentinel events and can be found [here](https://github.com/OpenQDev/OpenQ-Bounty-Actions-Autotask/blob/staging/events/events.js).