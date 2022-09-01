import React from 'react';

export type ComponentDefinitions = Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>;

export type ButtonConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>}