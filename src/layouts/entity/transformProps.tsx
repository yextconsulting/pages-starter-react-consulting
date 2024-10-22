import type { LocationProfile, TemplateRenderProps } from "src/types/entities";
import type { TransformProps } from "@yext/pages";
import { formatPhone } from "src/common/helpers";
import { getTranslations } from "../../i18n";
import { getPhoneParts } from "@yext/phonenumber-util";

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
    tollFreePhone,
    address,
    dm_directoryParents_defaultdirectory,
    name,
  } = data.document;

  (dm_directoryParents_defaultdirectory || []).push({ name: name, slug: "" });

  const translations = await getTranslations(data.document.locale);

  return {
    ...data,
    document: {
      ...data.document,
      t_mainPhone: mainPhone
        ? {
            label: formatPhone(mainPhone, address.countryCode) || mainPhone,
            href: getPhoneParts(mainPhone).href ?? `tel:${mainPhone}`,
            raw: mainPhone,
          }
        : undefined,
      t_tollFreePhone: tollFreePhone
        ? {
            label:
              formatPhone(tollFreePhone, address.countryCode) || tollFreePhone,
            href: getPhoneParts(tollFreePhone).href ?? `tel:${tollFreePhone}`,
            raw: tollFreePhone,
          }
        : undefined,
      dm_directoryParents_defaultdirectory:
        dm_directoryParents_defaultdirectory,
    },
    translations,
  };
};
