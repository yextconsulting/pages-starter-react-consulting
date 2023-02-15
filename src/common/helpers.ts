import {
  parsePhoneNumberWithError,
  CountryCode,
  ParseError,
} from "libphonenumber-js";

function dedupeStreamFields(allFields: string[]): string[] {
  return [...new Set(allFields)];
}

/** formatPhone shouldn't be used outside transformProps (in src/templates)
 * unless absolutely necessary because we don't want to include libPhoneNumber client-side
 *
 * If you are looking to update the format of phones
 * look inside src/templates/index.tsx's transformProps function
 **/
function formatPhone(
  s: string | undefined,
  countryCode: string
): string | undefined {
  if (s) {
    try {
      const phone = parsePhoneNumberWithError(s, countryCode as CountryCode);

      if (countryCode === "US") {
        return phone.formatNational(); // (123) 555-6789
      } else {
        return phone.formatInternational(); // +1 123 555 6789
      }
    } catch (error) {
      if (error instanceof ParseError) {
        // Not a phone number, non-existent country, etc.
        console.error(error.message);
      }
    }
  }

  return s;
}

export { dedupeStreamFields, formatPhone };
