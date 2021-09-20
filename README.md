# Monorepo For Crypto Music (Tentative)

Monorepo managed with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).
Front end written in [TypeScript](https://www.typescriptlang.org/) and built with [React](https://reactjs.org/), [Emotion](https://emotion.sh/docs/introduction), and [Next.js](https://nextjs.org/).
Back end also written in [TypeScript](https://www.typescriptlang.org/) and deployed to [Google Cloud Functions](https://cloud.google.com/functions).
Authentication and database handled by [Firebase](https://firebase.google.com/).

## Setup

To set up the project, run the following commands below:

```bash
git clone https://github.com/iknowhtml/crypto-music.git
cd crypto-music
yarn install
```

## Available Scripts

### Root Directory

In the project directory, you can run:

### `yarn <WORKSPACE_NAME>`

Which is shorthand for `yarn workspace <WORKSPACE_NAME>`.
Using this script, you can run arbitrary scripts for each respective workspace:

#### Example:

`yarn <WORKSPACE_NAME> start`

#### Available Workspaces

- client
- functions

### `client` Directory

#### `yarn start`

Starts the Next.js server in development mode with hot reloading for changes to source code, as well as the Next.js configuration file.

Visit `localhost:3000` to view the application.

**NOTE:** Before running the web client locally, please make sure to have a `.env.local` environment variable file with the following values:

```
NODE_ENV="development"
FIREBASE_ADMIN_CREDENTIALS="<LOCAL PATH TO FIREBASE ADMIN CREDENTIALS>"
NEXT_PUBLIC_OPEN_LOGIN_CLIENT_ID="<OPEN LOGIN CLIENT ID>"
NEXT_PUBLIC_WYRE_SECRET_KEY="<WYRE SECRET KEY>"
NEXT_PUBLIC_WYRE_API_KEY="<WYRE API KEY>"
NEXT_PUBLIC_WYRE_REFERRER_ACCOUNT_ID="<WYRE REFEREER ACCOUNT ID>"
```

Please note that any values surrounded by `<` `>` and are placeholder values, and must be filled in with the actual value.

#### `yarn start:debug`

Starts the Next.js server in debug mode.

#### `yarn build`

Compiles the source code into an optimized build ready for deployment.

**NOTE:** The web client depends on Firebase cloud functions running locally.

See the Functions Directory section for information on how to run cloud functions locally.

### `functions` Directory

#### `yarn start`

Runs the Firebase cloud functions locally on an emulator.
It's recommended to run `yarn build --watch` in conjunction with this command so changes made to the source code are reflected in the development environmnt without having to restart the emulator.

**NOTE:** Before running cloud functions locally, please make sure to have a `.env.local` environment variable file with the following values:

```
LOCAL_FIREBASE_CREDENTIALS="<LOCAL PATH TO FIREBASE ADMIN CREDENTIALS>"
```

### `yarn build`

Compiles the source code to a deployment ready build.

Recommended to run with the `--watch` flag in conjuncition with `yarn start`.
