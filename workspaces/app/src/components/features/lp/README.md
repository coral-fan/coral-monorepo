# Coral Home Page

## Set Up

1. Pull the repo by running `git clone https://github.com/coral-fan/.coral-monorepo.git`.
2. Check out to your branch by running `git checkout feature/home-page`.
3. Install Node 16.15.0 (via nvm (_RECOMMENDED_) for [Windows](https://github.com/nvm-sh/nvm) or [Mac OS](https://github.com/coreybutler/nvm-windows) or [installer](https://nodejs.org/en/download/)).
4. [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/install/). Can also use package manager of choice, up to you.
5. Run `yarn install`.
6. Add a `.env.development.local` file to `workspaces/app/`. Content of file will be shared with you on Slack.
7. Start the development server by running `yarn app start`.

**NOTE:** all commands should be ran in a shell environment.

## Instructions

Please **ONLY** work in the `workspaces/app/src/components/features/home` directory.

Specifically, you should only be using touching the `Home.tsx` file in the directory, but add files to this directory as necessary.

Please however feel free to configure Tailwind (`workspaces/app/src/styles/global.css`, `workspaces/app/tailwind.config.js` & `workspaces/app/postcss.config.js`) to your linking.

If you need to touch other areas of the codebase, please reach out to Aki on Slack.

Once you are done, please open a Pull Request (PR) on Github to the `main` branch. Please use proper capitalization in your PR.

Lastly, please use semantic HTML.

Best practices include, but are not limited to:

- Proper heading level structure
  - Only one `h1` on the page
  - Heading levels increment and decrement by one level (Example, `h3` should only )
- Proper usage of tags
  - Headings should be `h<N>` elements
  - Buttons should be `button` elements
  - Links should be `a` elements
  - etc.

**NOTE**: Modifications have been made to the codebase so that minimal sensitive information is necessary for you to work. If any checks fail, or the `build` script fails, that is expected, and will be resolved after you open a pull request.

### `git` Commits

Please ensure the following for messages:

- Use present tense and proper capitalization.
- Don't exceed 50 characters per commit message.
  - If you need more space, write a more general message, and then add details in the next line.
  - For examples, please see the repo or ask Aki if you're not sure about anything.
- Commit often so progress can be easily tracked.
