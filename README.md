# OpenQ-OZ-Claim-Autotask

Add your admin API_KEY and API_SECRET to your .env file

DEVELOPMENT
```bash
defender-autotask update-code <AUTOTASK_ID_DEVELOPMENT> .
```

STAGING
```bash
defender-autotask update-code <AUTOTASK_ID_STAGING> .
```

PRODUCTION
```bash
defender-autotask update-code <AUTOTASK_ID_PRODUCTION> .
```

## Running Locally

Step 1: Re-Add Dev Dependencies to `package.json`

Due to body size limits on OZ tasks, the following dev deps are only needed for local development, but cannot be included in the `node_modules/` folder at the time of pushing code.

```json
	"devDependencies": {
		"dotenv": "^14.3.2",
		"express": "^4.17.2",
		"nodemon": "^2.0.15",
		"jest": "^27.4.7"
	}
```

Step 2: Install Dependencies

`yarn`

Step 3: Start

`yarn start:dev`