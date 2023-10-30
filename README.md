# PAGES-STARTER-REACT-BASIC

This repository provides a basic example of how to start developing a React site on the Yext Sites system.

## Quickstart Instructions

### Prerequisites

1. Have the Yext CLI installed: https://hitchhikers.yext.com/guides/cli-getting-started-resources/01-install-cli/
2. Have Deno installed, version 1.21.0 or later: https://deno.land/manual/getting_started/installation
3. Have node installed, version 17 or later: https://nodejs.org/en/download/

   - It's recommend to use nvm: https://github.com/nvm-sh/nvm#installing-and-updating or via brew `brew install nvm`

4. Optional: Have a Yext account (necessary for production builds, deploying on Yext Sites, and pulling local stream document data via `yext sites generate-test-data`). This starter already comes with some localData that can be used for local dev without the need to init with a Yext account.

### Getting started

1. Clone this repo and install dependencies:

   ```bash
   git clone https://github.com/yextconsulting/pages-starter-react-consulting.git
   cd pages-starter-react-consulting
   npm install
   ```

2. Run `yext init` and authenticate the CLI with your Yext credentials. Add the `-u sandbox` flag if you're using a sandbox Yext account.
3. Run `yext resources apply platform-config/config` to apply the required configuration resources to your account.
4. Run `yext resources apply platform-config/entities` to add the necessary entities to your account. This includes a test location entity which can be deleted before running the apply command if desired.

   - You will be prompted to enter several API keys during this step which power the `<Reviews>`, `<Nearby>` and `<Locator>` components. If you do not plan to use these components, you can skip the API key input by pressing Enter.
   - The Reviews API key should come from a developer app with Read access to the Management API > Reviews endpoint.
   - The Nearby API key should come from a developer app with Read access to the Content Delivery API > Entities endpoint.
   - The Search API key should be an API key from the search experience in your account you plan to use for your locator. If you plan to use the search experience that is created automatically for you in step 5, you can skip this step by hitting **Enter** and fill in the key after the search experience has been created.
   - These keys will live on the Site entity that is created during this step, so you can always update or add the keys later once the entity has been created.
   - For guidance on creating a developer app in the Yext plaform, see the first two steps of the Slug Manager section below.

5. Optionally, run `yext resources apply platform-config/advanced` to apply test product, financial professional and faq entities to your account as well as an updated test location which links to these newly created entities. To make sure this related entity information is displayed on your location template, navigate to **src** > **layouts** > **entity.tsx** and comment in the Product, Team and FAQ field sets in the `fields` section of the `configBuilder` function. These fields will now be included in the stream that powers your location template.
6. If you are implementing a locator search experience, run `yext resources apply platform-config/search` to apply the locator search config to your account.
7. In the Yext platform, run the directory manager named “Directory” that was created as part of the resource apply command in Step 3. This will create the location-related entities necessary to render a directory on the frontend based on your account’s location entities.
   1. Navigate to **Pages** > **Directory Manager**.
   2. Click to view the directory, then click **Run**.
8. If you plan to leverage the `<Nearby>` component to show nearby locations, navigate to **src** > **components** > **entity** > `Nearby.tsx` and replace the placeholder `savedFilterIds` value in the `getConfig` function with the ID of the saved filter you use to filter which locations should be live on your site. If you do not use a saved filter, delete this line entirely.
9. If you plan to use the `<Locator>` component, you will need to have a map provider API key and update the placeholder value in **src** > `config.ts` with your key. You will also need to ensure the `experienceKey` and `verticalKey` values match the search experience you'd like to use.
10. If you did not provide API keys for the `<Reviews>`, `<Nearby>` and `<Locator>` components during step 4, these components will not work properly and will produce errors if used.
11. If you are working in a sandbox Yext account, refer to the Working With a Sandbox Account section below to see what changes need to be made to the repo.
12. You’re good to go! Run `npm run dev` to spin up a local development server and take a look at your starter site.
13. See [here](https://drive.google.com/file/d/1A1sNSciY0zD4SVVhRYaoFo9yC7u3InBz/view?usp=sharing) for a detailed video walk-through of these instructions.

### Working With A Sandbox Account

There are a few changes that must be made to the repo to ensure it works with sandbox Yext accounts:

1. If you plan to leverage the `<Nearby>` component to show nearby locations, navigate to **src** > **components** > **entity** > **Nearby.tsx** and update the `endpoint` value in the `getConfig` function to `https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch`.
2. If you plan to leverage the `<Locator>` search component, navigate to **src** > `config.ts` and comment in the `endpoints: SandboxEndpoints` line of the `provideHeadless` function and update your import from `@yext/search-headless-react` accordingly.
3. Follow step 3 in the Slug Manager section to make the plugin work with your sandbox account.

### Implementing the Slug Manager

The Slug Manager helps to automate the process of populating and updating the builtin `slug` field on your entities. The `slug` field is used to determine what the URL of each entity-powered page will be. If you’d like to use the Slug Manager, follow the instructions below:

1. In the Yext platform, navigate to **Developer** > **Developer Console**. Click **Add an App**. Name it "Slug Manager" and click **Create App**.
2. In the **API Credentials** section, add **Read / Write** permissions to the **Management API** > **Entities** endpoint and click **Save**. Copy the API Key on this page as you’ll need it in the next step.
3. If you are working in a sandbox Yext account, navigate to `platform-config/slug-manager/plugin/mod.ts` and add `env:”sandbox”` to the object being passed to the `createSlugManager` function. For example:

   ```jsx
   export const { webhook, connector } = createSlugManager({
     apiKey: API_KEY,
     slugFormat: (lang, profile) => {
       if (lang === "en") {
         return "[[address.region]]/[[address.city]]/[[address.line1]]";
       }
       return "[[localeCode]]/[[address.region]]/[[address.city]]/[[address.line1]]";
     },
     fields: [],
     entityTypes: ["location"],
     env: "sandbox", // add this line for sandbox accounts
   });
   ```

4. Run `yext resources apply platform-config/slug-manager` to add the slug management plugin and connector to your account. When you are prompted to provide an API key, paste the key you copied from your developer app and hit **Enter**.
5. To populate an initial `slug` value for all your location entities, go into the Yext platform and navigate to **Content** > **Connectors**. Go to the **Update All Slugs** connector and click **Run Connector**.
6. To ensure `slug` values are kept up to date when data changes or new entities are created, navigate back to the developer app you created and navigate to the **Webhooks** section. Click **Add a Webhook**.
7. Select **Entities** as the Webhook Type and click **Next**.
8. Name your webhook whatever you’d like. Under where it says “URL”, click on **…or invoke a function**.
9. Select the **Slug-Manager** function and click the webhook option. Hit **Finish and Add**.
10. The Slug Manager is now set up and ready to go!

### Implementing the `urlWriteBack` function

It is a common practice to store an entity page URL as a field on the entity itself. The `urlWriteback` function helps to automate the process of keeping the URL field value up to date if the underlying URL changes. To set up the `urlWriteback` function, the follow the instructions below:

1. In your repo, navigate to `functions/onUrlChange/urlWriteback.ts`.
2. By default, the function references `c_pagesURL` as the field where your entity page URL will be stored on each entity. You can either create a field with this API name or change the value of the `pageUrlCustomField` to the field API name of the field you plan to use to store your URLs.
3. Update the placeholder value for the `API_KEY` variable with a real API key. If you went through the above instructions to set up the Slug Manager, you can use that same API key here. If not, follow the first two steps in the Slug Manager section to create an app with **Read / Write** permissions to the **Entities Management API** endpoint.
4. You’re good to go! This function will be invoked by the `onUrlChange` event documented [here](https://hitchhikers.yext.com/docs/pages/plugins/?target=plugin-events).

## Useful commands

`yext init` - Authenticates the Yext CLI with your Yext account

`npm run dev` - runs your code against a local dev server using Vite

- All stream documents come from the `localData` folder
- You can visit either of these urls out of the box
  - http://localhost:3000/index/123
  - http://localhost:3000/static

`npm run dev -- dynamic` - same as above except instead of using files from `localData` it will pull the document from Yext on the fly

`yext sites generate-test-data` - pull an example set of `localData` from your account

`yext sites build` - Runs a production build against your `localData`

`yext sites serve` - Runs a local server against your production-built files

- It's recommended to `yext sites build` followed by `yext sites serve` before committing in order to test that a real production build won't have any issues. In practice, development builds (via `npm run dev`) and production builds compile and bundle assets differently. For local development, ES Modules are loaded directly by the browser, allowing fast iteration during local development and also allows for hot module replacement (HMR). Other things like CSS are also loaded directly by the browser, including linking to sourcemaps. During a production build all of the different files are compiled (via ESBuild for jsx/tsx) and minified, creating assets as small as possible so that the final html files load quickly when served to a user.

`npm run fmt` - Automatically formats all code

`npm run lint` - Run ESLint to check for errors and warnings

## Repository Layout

```
root
└───localData
└───sites-config
│   │   ci.json
└───src
│   │   index.css
│   │
│   └───components
│   │
│   └───layouts
│       │   main.tsx
│   │
│   └───templates
│       │   index.tsx
│       │   static.tsx
│   │
│   └───types
```

### localData

Contains example stream documents that are used while local developing. By default this repo contains example files that work with the provided example templates. You can generate real stream documents specific to your Yext account via `yext sites generate-test-data`.

NOTE: You normally wouldn't want to check in the localData folder as it's only used for local dev. It is gitignored by default.

### sites-config

Contains a single `ci.json` file. This file defines how the Yext CI system will build your project. It is not used during local dev. However, it is used when running a local production build (i.e. `yext sites build`).

NOTE: A `features.json` file will automatically be generated during CI build for you based on the `config`s defined in your templates. One has been checked in to this repo so that `yext sites generate-test-data` works out of the box (assuming you've `yext init`'ed with your Yext account). If this file doesn't exist then `yext sites build` will implicitly generate a new one when it calls `npm run directbuild` (defined in `sites-config/ci.json`).

### src

#### components

This is where all of your custom components _may_ live. This folder is not required and you can set up your own custom folder structure for your own components in any way you'd like, as long as it lives in the `src` directory.

#### layouts

This is where wrapper components _may_ live. Like `/components` this folder is not required, and only serves organizational benefits. Layouts help encapsulate top level components across templates. A top level component can be a header, footer, react context, or anything else you'd like to preserve across multiple templates.

#### templates

Required. This is where your actual templates live. There are effectively two types of components:

1. stream-based templates: those that have an exported `config`
1. static templates: those that don't have an exported `config`. Furthermore, they may also export a `getStaticProps` function if external data is required.

NOTE: It's not currently possible to generate multiple html files using a static template, even if `getStaticProps` returns arrayed data.

#### types

Here you can define any custom TypeScript types you need.

#### index.css

Not required. In this example this sets up Tailwind CSS.

### vite.config.js

Vite is now a first class member of the starter! This file defines any custom Vite configuration you want, giving you full control over your setup. Specifically, it will allows users to pass additional configuration options to the vite-plugin-yext-sites-ssg plugin when they become more widely available.

### Everything else

The rest of the files are basic config setup common to many other React projects. In this example we've enabled:

1. Tailwind CSS (which leverages PostCSS) - used for easy styling
1. ESLint - catches errors in your code
1. Prettier - formats your code (you can add .prettierrc to override any default settings)
1. TypeScript - adds typing to Javascript for a better developer experience

## Temporary Changes / Additional Notes

### .npmrc

This file is necessary while this repository is private. You will need to add an environment variable called `NPM_TOKEN` in your branch settings in the Yext Sites UI. You can create the token via the https://npmjs.org 'Access Tokens' section. You will also need to export `NPM_TOKEN` in ~/.bash_profile locally as well (`npm login` doesn't seem to work when this file exists in the repo).
