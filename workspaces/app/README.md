# App Workspace

## Set Up

Before running the web client locally, please make sure you have a `.env.local` environment variable file with the following values:

```shell
FIREBASE_ADMIN_CREDENTIAL_JSON="<RAW JSON DATA FOR FIREBASE ADMIN CREDENTIALS>"
NEXT_PUBLIC_FIREBASE_CONFIG_JSON="<RAW JSON DATA FOR FIREBASE CONFIG>"
NEXT_PUBLIC_COVALENT_API_KEY="<COVALENT API KEY>"
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID="<WEB3AUTH CLIENT ID>"
```

Please note that any values surrounded by `<` `>` and are placeholder values, and must be filled in with actual values.

Lastly, for `FIREBASE_ADMIN_CREDENTIAL_JSON` & `NEXT_PUBLIC_FIREBASE_CONFIG_JSON`, please ensure the values are in JSON format, and remove line breaks.

## Scripts

### `yarn start`

Starts the Next.js server in development mode with hot reloading for changes to source code, as well as the Next.js configuration file.

Visit [localhost:3000](http://localhost:3000) to view the application.

### `yarn start:debug`

Starts the Next.js server in debug mode.

### `yarn storybook`

Starts the Storybook development server.
Visit [localhost:6006](http://localhost:6006) to view Stories.

### `yarn build`

Creates a production build of the application. Please always run this command to ensure that your branch build before opening/merging a PR.

### `yarn lint`

Runs ESLint on codebase. Please always run this command before opening/merging a PR to ensure no errors get introduced into the codebase.

### `yarn clean`

Removes `node_modules` and `.next` build directory.

### `yarn clean:build`

Removes `.next` build directory.
