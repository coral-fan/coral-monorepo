# Client Workspace

## Set Up

Before running the web client locally, please make sure you have a `.env.local` environment variable file with the following values:

```
FIREBASE_ADMIN_CREDENTIALS="<LOCAL PATH TO FIREBASE ADMIN CREDENTIALS>"
NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID="<OPEN LOGIN CLIENT ID>"
NEXT_PUBLIC_WYRE_SECRET_KEY="<WYRE SECRET KEY>"
NEXT_PUBLIC_WYRE_API_KEY="<WYRE API KEY>"
NEXT_PUBLIC_WYRE_REFERRER_ACCOUNT_ID="<WYRE REFEREER ACCOUNT ID>"
```

Please note that any values surrounded by `<` `>` and are placeholder values, and must be filled in with the actual value.

**NOTE:** The web client depends on Firebase cloud functions running locally.

See the [Functions workspace](https://github.com/Coral-Music/coral-monorepo/tree/master/workspaces/functions) for information on how to run the back end serverless cloud functions locally.

## Available Scripts

### `yarn start`

Starts the Next.js server in development mode with hot reloading for changes to source code, as well as the Next.js configuration file.

Visit [localhost:3030](http://localhost:3030) to view the application.

### `yarn start:functions`

Builds a development bundle and starts a serverless Firebase cloud function to serve the client.

Visit [localhost:8080](http://localhost:8080) to view the application.

### `yarn start:mobile-testing`

Builds a mobile testing bundle and starts a serverless Firebase cloud function to serve the client.

Visit [coral.ngrok.io](https://coral.ngrok.io) to view the application.
**NOTE**: Please run `start:tunnel` in the root of the repo to be able to view the application on the URL above.

### `yarn start:debug`

Starts the Next.js server in debug mode.

### `yarn build`

Compiles the source code into an optimized build ready for deployment.

### `yarn deploy`

Deploys Next.js serverless functions to Firebase. **PLEASE** be mindful that this deploys to production, so make sure that your local codebase **WILL NOT** break our production environment.
