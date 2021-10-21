# Velocity Global Customer Management UI

This project contains React Native and Web frontends which will serve as the next generation user portal for Velocity Global customers and employees.

## Prerequisites

- [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Node](https://nodejs.org/en/download/) are installed on your machine. (Note that in most cases, Yarn installs Node as a dependency)
- Current officially supported NodeJS version is `12.18.3`.

  - If you need to manage multiple versions, we recommend using [asdf vm](https://asdf-vm.com/#/) and have included a `.tool-versions` file for convenience.
  - asdf has some issues with yarn, so it is also recommended to run the following command after globally installing yarn:
    - `yarn config set prefix ~/.yarn`
    - without this, you might see some issues with changing node/yarn versions

- [Expo](https://docs.expo.io/get-started/installation/) and dependencies
  - To run the application on an iOS simulator, [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) is required
  - To run the application on an Android simulator, [Android Studio](https://developer.android.com/studio) and correct environment configuration is required
  - To run the application on a device, the Expo app should be downloaded from either the [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/us/app/expo-client/id982107779).

## Running the Project

### Mobile

- `yarn install`
- `expo start`

An expo portal will start allowing you to facilitate running the app in whichever environment desired. Please refer to the "Opening the app on your phone/tablet" section of the [Expo Create A New App](https://docs.expo.io/get-started/create-a-new-app/) documentation for instructions on the expo portal.

### Web

- `yarn install`
- `yarn start`

A server will be running at http://localhost:8080. Note that you will need an Okta account in order to authenticate.

## Testing

- `yarn test`

This project uses Jest and React Testing Library for unit tests, [as recommended by the React org](https://reactjs.org/docs/testing.html).\

We also use [Cypress](https://www.cypress.io/) for automated E2E tests.

Please see the individual Readmes in `/src/test` and `/cypress` for details


## Coding Style / Patterns

When in doubt, please try to follow existing patterns. Currently, coding style is enforced through ESLint.

- Please ensure that ESLint is set up with your editor/IDE and that it uses our custom defined `.eslintrc`
- To view a full list of any lint issues, you can also run `yarn lint`
- Please try to avoid pushing up any code with lint issues.

---

### Documentation

- `yarn docs` - generates html documentation in `/docs`

Please add [JSDoc comments](https://jsdoc.app/) to at least every file and function.

- Document all component inputs and outputs through [React PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html).
  - include a JSDoc description for each of these - this will help us to leverage `@component`, described below.
- Document all function parameters with `@param` where applicable and all component props with `@property`.
- Use `@module` for functional/stateless service files.
- The project leverages [better-docs](https://github.com/SoftwareBrothers/better-docs) to organize documentation with `@cagegory` and `@subcategory` tags, and will be using their `@component` feature once it is out of beta.
  - Current supported values for `@category` are `[Components, Hooks, Modules, Providers, Services]`
  - Use `@subcategory` to group components under the `src/modules` folder.

---

### React Patterns

- Try to write functional components using [hooks](https://reactjs.org/docs/hooks-intro.html), rather than class components.
- Name your component file `<ComponentName>.js` and place it in a folder with the same name (minus the extension).

---

### SVG Patterns

- React Native does not support sing SVG icons out of the gate, which means we must leverage the [React Native SVG library](https://docs.expo.io/versions/latest/sdk/svg/) to handle them for us.
- Using SVGs over PNGs is preferable, however, some work on our end is required to format and use the SVGs as needed. Please refer to the [ExampleIcon.md](src/icons/ExampleIcon.md) for directions on using the icons folder and building SVG components.

---

### CSS

- use `rem` for all font sizes

This project uses [styled-components](https://styled-components.com/) with the following patterns:

- Unless your component only has a couple lines of css, define a separate file for styles in the component folder: `<ComponentName>.styles.js`
- Styled components should be named with a prefix indicating the underlying React Native element, e.g. `<ViewOuterContainer>` or `<TextFancyHeader>`
- If your styled component requires props, reuse the same prop names from the outer react component where possible.

## Recommended VSCode Plugins

- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [jsdoc](https://marketplace.visualstudio.com/items?itemName=lllllllqw.jsdoc)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Relative Path](https://marketplace.visualstudio.com/items?itemName=jakob101.RelativePath)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Builds

- Follow Expo's documentation for creating [Standalone Moblie App builds](https://docs.expo.io/distribution/building-standalone-apps/)
- When standalone applications are built via the CI pipeline, the environment's corresponding google analytics configuration is copied from the `cicd/` folder to either the `google-services.json` (Android) or `GoogleService-Info.plist` (iOS). These files control which stream analytic events are logged under. Any changes to the current Google Analytics configuration will likely need to be reflected in these files.

## Support

Please reach out to @cgrochmal or @cbdallavalle with any questions, suggestions, or concerns.
