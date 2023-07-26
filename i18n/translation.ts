// An 'i18n/locale/{locale}/translation.json' dynamic import cannot be analysed by vite due
// to rollup limitations (see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations)
// So we have to define this function under this directory rather than under src

export async function getTranslations(localeCode: string) {
  return await import(`./locale/${localeCode}/translation.json`).then(
    (module) => module.default
  );
}
