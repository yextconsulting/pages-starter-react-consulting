import { extendTailwindMerge } from "tailwind-merge";

/**
 * We extend the base tailwind-merge so that conflicts between custom classes can be
 * handled correctly.
 *
 * When new tailwind classes are introduced they should be added to the `classGroups` object below.
 *
 * @example
 * tailwindcss/forms adds the form-input, form-checkbox, etc. classes,
 * so we need to add the 'form' class group here for twMerge to recognize form-input
 * and form-checkbox as conflicting classes.
 */
export const twMerge = extendTailwindMerge({
  classGroups: {
    form: [
      "input",
      "checkbox",
      "textarea",
      "select",
      "multiselect",
      "radio",
    ].map((v) => "form-" + v),
  },
});
