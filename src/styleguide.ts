import resolveConfig from 'tailwindcss/resolveConfig'
//@ts-ignore: figure out how to use Tailwind's provided config type for this
import * as tailwindConfig from '../tailwind.config.cjs';
import { KeyValuePair } from "tailwindcss/types/config.js";

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
const fullConfig = resolveConfig(tailwindConfig);

const variantBuilder = <T extends string>(base: string) => (...variants: T[]) => {
	return ([base, ...variants.map((variant: T) => `${base}--${variant}`)])
}

type ButtonVariant = keyof typeof fullConfig.theme.buttons

const Button = variantBuilder<ButtonVariant>("Button");