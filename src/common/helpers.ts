import { formatPhoneNumber, isValidPhoneNumber } from "@yext/phonenumber-util";

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
  if (s && isValidPhoneNumber(s)) {
    let phone: string | null;

    if (countryCode === "US") {
      // (123) 555-6789
      phone = formatPhoneNumber({
        e164: s,
        format: "(xxx) xxx-xxxx",
      });
    } else {
      // +1 123 555 6789
      phone = formatPhoneNumber({
        e164: s,
        format: "+x xxx xxx xxxx",
      });
    }

    return phone || s;
  }

  return s;
}

const sortDirectoryByAlphabetical = (directoryChildren: any[]) => {
  const sortFn = (p1: any, p2: any) => {
    if (p1.name === p2.name) {
      return 0;
    }
    return p1.name < p2.name ? -1 : 1;
  };

  return directoryChildren.sort(sortFn);
};

export { dedupeStreamFields, formatPhone, sortDirectoryByAlphabetical };
