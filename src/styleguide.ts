const variantBuilder =
  <T extends string>(base: string) =>
  (...variants: T[]) => {
    return [base, ...variants.map((variant: T) => `${base}--${variant}`)];
  };

export const ButtonVariants = {
  primary: "primary",
  secondary: "secondary",
} as const;

/**
 * Type of link types that might be received from the platform.
 */
export type ButtonVariant = typeof ButtonVariants[keyof typeof ButtonVariants];

export const ButtonClass = variantBuilder<ButtonVariant>("Button");
