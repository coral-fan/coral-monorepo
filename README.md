# Monorepo For Crypto Music (Tentative)

Monorepo managed with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).
Front end written in [TypeScript](https://www.typescriptlang.org/) and built with [Next.js](https://nextjs.org/).
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

### `yarn start`

Runs the entire application stack in development mode.

Open [http://localhost:3000](http://localhost:3000) to view the application locally.

### `yarn client`

Shorthand for `yarn workspace client`. 

#### Example Use Cases:
##### `yarn client start`
Runs the start script for the client.
##### `yarn client add <PACKAGE>`
Installs `<PACKAGE>` inside client workspace.
