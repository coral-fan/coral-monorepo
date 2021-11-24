# Functions Workspace

## Set Up

Before running cloud functions locally, please make sure you have a `.env` environment variable file with the following values:

```
LOCAL_FIREBASE_CREDENTIALS="<LOCAL PATH TO FIREBASE ADMIN CREDENTIALS>"
```

Please note that any values surrounded by `<` `>` and are placeholder values, and must be filled in with the actual value.

## Available Scripts

### `yarn start`

Builds the serverless functions and runs the Firebase cloud functions locally on an emulator.
It's recommended to run `yarn build --watch` in conjunction with this command so changes made to the source code are reflected in the development environmnt without having to restart the emulator.

### `yarn start functions`

Only runs the Firebase cloud functions locally on an emulator.

### `yarn build`

Compiles the source code to a deployment ready build.

Recommended to run with the `--watch` flag in conjuncition with `yarn start`.

### `yarn deploy`

Deploys the back end serverless functions to Firebase. **PLEASE** be mindful that this deploys to production, so make sure that your local codebase **WILL NOT** break our production environment.
