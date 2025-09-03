function dedupeStreamFields(allFields: string[]): string[] {
  return [...new Set(allFields)];
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

export { dedupeStreamFields, sortDirectoryByAlphabetical };
