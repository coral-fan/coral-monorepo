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

See the [Functions workspace](../functions) for information on how to run the back end serverless cloud functions locally.

## Available Scripts

### `yarn start`

Starts the Next.js server in development mode with hot reloading for changes to source code, as well as the Next.js configuration file.

Visit [localhost:3030](http://localhost:3030) to view the application.

### `yarn start:debug`

Starts the Next.js server in debug mode.

### `yarn build`

Compiles the source code into an optimized build ready for deployment.
