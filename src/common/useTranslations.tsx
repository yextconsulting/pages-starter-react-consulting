import { Fragment } from "react";
import { useTemplateData } from "src/common/useTemplateData";

/**
 * A translation function translates text using the JSON file in i18n/locale/ for the current locale.
 * @param text The text to translate
 * @param replacements A dictionary of replacements to make in the translated text.
 *   The key is the placeholder to replace, and the value is the replacement.
 *   The keys are expected to be in braces in the original text.
 *   For example, for text "Hello {NAME}", the key should be "NAME".
 *   The replacement value may be a string or a JSX element.
 * @returns The translated text. If any JSX is inserted, it returns an array of JSX elements.
 */
export type TranslationFunction = {
  (text: string, replacements?: Record<string, string | number>): string;
  (text: string, replacements: Record<string, string | number | JSX.Element>):
    | string
    | JSX.Element[];
};

function replaceWithStringOrJSX(
  text: string,
  findStr: string,
  replacement: string | JSX.Element
): (string | JSX.Element)[] {
  const replacedTextArr = text
    // Split at each match
    .split(findStr)
    // Insert replacement between matches
    .map((substring, i) => [i == 0 ? "" : replacement, substring])
    .flat()
    // Combine consecutive strings
    .reduce((arr: (string | JSX.Element)[], strOrJSX) => {
      if (
        arr.length == 0 ||
        typeof strOrJSX != "string" ||
        typeof arr[arr.length - 1] != "string"
      ) {
        arr.push(strOrJSX);
      } else {
        arr[arr.length - 1] += strOrJSX;
      }

      return arr;
    }, []);

  return replacedTextArr;
}

function useTranslations(): TranslationFunction {
  const { translations } = useTemplateData();

  // Overloads to match the TranslationFunction type definition
  function translate(
    text: string,
    replacements?: Record<string, string | number>
  ): string;
  function translate(
    text: string,
    replacements: Record<string, string | number | JSX.Element>
  ): string | JSX.Element[];
  function translate(
    text: string,
    replacements?: Record<string, string | number | JSX.Element>
  ) {
    let replacedTextArr: (string | JSX.Element)[] = [
      translations[text] || text,
    ];

    for (const [key, replacement] of Object.entries(replacements ?? {})) {
      replacedTextArr = replacedTextArr
        .map((strOrJSX) =>
          typeof strOrJSX == "string"
            ? replaceWithStringOrJSX(
                strOrJSX,
                `{${key}}`,
                typeof replacement == "number" ? `${replacement}` : replacement
              )
            : strOrJSX
        )
        .flat();
    }

    // If there is only one item in the array and it's a string, return it as a string.
    // Otherwise, put all the strings and JSX elements in Fragments and assign keys so that React doesn't complain about them not having any.
    return replacedTextArr.length == 1 && typeof replacedTextArr[0] == "string"
      ? replacedTextArr[0]
      : replacedTextArr.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ));
  }

  return translate;
}

export { useTranslations };
