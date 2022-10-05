import React from 'react';

export type ComponentDefinitions = Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>;

export type HoverComponentConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {'&:hover': React.CSSProperties}>}

export type ResponsiveComponentConfig = React.CSSProperties & {variants: Record<string, React.CSSProperties | {'@screen sm': React.CSSProperties}>}
