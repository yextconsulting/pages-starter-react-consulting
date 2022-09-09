import { i18nextToPo, gettextToI18next } from 'i18next-conv';
import fs from 'fs';
import { SmartlingAPI } from './api.js';
import i18nConfig from './smartling.config.js';
import { exec } from 'child_process';


function relURL(path) {
  return new URL(path, import.meta.url);
}

async function main() {
  if (process.argv.length < 2) {
    throw new Error('Invalid args - Usage: node index.js [pull|push]');
  }
  const commandName = process.argv[2];

  const commands = {
    'pull': pull,   // Push translations to smartling
    'push': push,   // Pull translations from smartling
    'scan': scan,   // Scan files for new translation strings to add to json files
  };

  // Check if command is valid
  if (!commands.hasOwnProperty(commandName)) {
    throw new Error('First arg invalid, must be a valid command: [pull|push]');
  }

  // Check if config is valid
  //  NOOP if invalid config - that indicates this project is not using Smartling
  if (!i18nConfig.userID || !i18nConfig.userSecret || !i18nConfig.projectID) {
    console.log(`'smartling ${commandName}: NOOP - initialize smartling integration by filling out 'i18n/smartling/smartling.config.js'`);
    return;
  }

  // Initialize the API
  const api = new SmartlingAPI(i18nConfig);
  await commands[commandName](api);
}

async function pull(api) {
  // Check config.locales exists
  if (i18nConfig.locales === undefined || i18nConfig.locales.length === 0) {
    throw new Error('smartling pull: Error - must define locales in `i18n/smartling/smartling.config.js > locales`')
  }

  i18nConfig.locales.forEach(async locale => {
    // Check if the yext/smartling locale name is different
    let apiLocale = locale;
    const localeMap = i18nConfig.smartlingLocaleToYextLocaleMapping;
    if (localeMap !== null) {
      Object.entries(localeMap).forEach(([smartlingLocale, yextLocaleList]) => {
        if (yextLocaleList.includes(locale)) {
          apiLocale = smartlingLocale;
        }
      });
    }

    // Download the translations & write to filesystem
    const localeTranslations = await api.download('native.po', apiLocale);
    const options = {
      compatibilityJSON: 'v4',
    };
    gettextToI18next(apiLocale, localeTranslations, options).then(output => {
      // Check directory exists before writing to it
      const outDirPath = relURL(`../${locale}/`);
      try {
        fs.accessSync(outDirPath)
      } catch (err) {
        fs.mkdirSync(outDirPath, { recursive: true });
      }
      const outFilepath = new URL('translation.json', outDirPath);
      console.log('Writing to ' + outFilepath);
      fs.writeFileSync(outFilepath, output, {flag: 'w'});
    });
  });
}

async function push(api) {
  // Read `config.defaultLocale` translations (fallback to 'en' if this field is empty)
  let defaultSource = "{}";
  let defaultLocale = i18nConfig.defaultLocale || 'en';
  try {
    defaultSource = fs.readFileSync(relURL(`../${defaultLocale}/translation.json`), 'utf-8');
  } catch(err) {
    console.log(`couldn\'t find "translation.json" source file for ${defaultLocale}`);
  }

  const source = {
    ...JSON.parse(defaultSource),
  }

  // convert file to .po format && write to filesystem
  // we need to convert JSON to .po because smartling doesn't support 
  //  i18next JSON's plural format
  const options = {
    compatibilityJSON: 'v4',
  };
  i18nextToPo('en', JSON.stringify(source), options).then((output) => {
    const outFilepath = relURL('./native.po');
    fs.writeFileSync(outFilepath, output, {flag: 'w'});
    console.log('Uploading native.po to smartling...');
    api.upload('native.po');
  });
}

async function scan() {
  if (i18nConfig.locales === undefined || i18nConfig.locales.length === 0) {
    throw new Error('smartling scan: Error - must define locales in `i18n/smartling/smartling.config.js > locales`')
  }

  const cmdString = `i18next 'src/**/*.{js,jsx,ts,tsx}' -c i18n/smartling/smartling.config.js`;
  exec(cmdString, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

}

await main();
