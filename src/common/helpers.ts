function dedupeStreamFields(allFields: string[]): string[] {
  return [...new Set(allFields)];
}

export {
  dedupeStreamFields,
};
