import type { LocationProfile, TemplateRenderProps } from "src/types/entities";
import type { TransformProps } from "@yext/pages";
import { formatPhone } from "src/common/helpers";
import "src/index.css";
import { getTranslations } from "../../i18n";

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<LocationProfile>
> = async (data) => {
  const {
    mainPhone,
    fax,
    tollFreePhone,
    mobilePhone,
    ttyPhone,
    localPhone,
    alternatePhone,
    address,
    dm_directoryParents,
    name,
  } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  const translations = await getTranslations(data.document.locale);

  return {
    ...data,
    document: {
      ...data.document,
      mainPhone: formatPhone(mainPhone, address.countryCode),
      fax: formatPhone(fax, address.countryCode),
      tollFreePhone: formatPhone(tollFreePhone, address.countryCode),
      mobilePhone: formatPhone(mobilePhone, address.countryCode),
      ttyPhone: formatPhone(ttyPhone, address.countryCode),
      localPhone: formatPhone(localPhone, address.countryCode),
      alternatePhone: formatPhone(alternatePhone, address.countryCode),
      dm_directoryParents: dm_directoryParents,
    },
    translations,
  };
};
