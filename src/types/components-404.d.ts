declare module "@yext/components-404" {
  export class LostAndFound {
    constructor(
      url: string,
      referrer: string,
      config: {
        destinationUrl: string;
        isStaging: boolean;
        pixelUrl?: string;
        siteDomain: string;
        siteId?: string;
        timeout?: number;
      }
    );

    installBasicHooks(): void;
    run(): void;
  }
}
