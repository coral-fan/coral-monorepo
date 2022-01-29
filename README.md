# Coral Monorepo

Monorepo managed with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).
Web application written in [TypeScript](https://www.typescriptlang.org/) and built with [React](https://reactjs.org/), [Emotion](https://emotion.sh/docs/introduction), and [Next.js](https://nextjs.org/). UI components developed in and documented using [Storybook](https://storybook.js.org/).
Authentication and database handled by [Firebase](https://firebase.google.com/) and application deployed to [Vercel](https://vercel.com).

## Setup

To set up the project, run the following commands below:

```bash
git clone https://github.com/Coral-Music/coral-monorepo.git
cd coral-monorepo
yarn install

npm i -g firebase-cli
# please make sure you've been added to the firebase project before proceeding with this step
firebase login
```

Next, go to the Firebase Console and go to Project Settings as below:
![image](./documentation/images/firebase_console.png)

Inside of Project Settings, navigate to the Service Accounts tab, and click the Generate new private key.
![image](./documentation/images/firebase_project_settings.png)

Save this file somewhere safe.
**NOTE**: Please **DO NOT** save this file anywhere inside the `coral-monorepo` directory.

### Local Mobile Device Testing

To test mobile devices locally, please install [ngrok](https://ngrok.com/) from https://ngrok.com/download.

Then add a `ngrok.yaml` file with the configuration below:

```yaml
authtoken: <YOUR_NGROK_AUTH_TOKEN>
tunnels:
  client:
    addr: 8080
    proto: http
    hostname: coral.ngrok.io
  server:
    addr: 7070
    proto: http
    hostname: server.coral.ngrok.io
```

Please note that any values surrounded by `<` `>` and are placeholder values, and must be filled in with the actual value.

you can get your `authtoken` from https://dashboard.ngrok.com/get-started/your-authtoken.

## Available Scripts

In the project directory, you can run:

### `yarn <WORKSPACE_NAME>`

Which is shorthand for `yarn workspace <WORKSPACE_NAME>`.
Using this script, you can run arbitrary scripts for each respective workspace:

#### Example:

`yarn <WORKSPACE_NAME> start`

#### Available Workspaces

- [client](/workspaces/client)

### `yarn start:tunnel`

Starts a tunnel from your local development environment to [coral.ngrok.io](https://coral.ngrok.io).

**NOTE**: Please run `yarn client start` before running this script.
