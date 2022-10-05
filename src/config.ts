import type { ConfigurationProviderContextType } from '@yext/sites-react-components';

const config: ConfigurationProviderContextType = {
  components: {},
};

interface ProjectConfigType {
  // Search experience details for using search-headless
  search: {
    apiKey: string;
    experienceKey: string;
    verticalKey?: string;
  },
  // Configure nearby locations section liveapi params and endpoint
  // See: https://hitchhikers.yext.com/docs/liveapis/knowledgegraphliveapi/entities/entities/#operation/geoSearchEntities for documentation
  nearby: {
    endpoint: string;
    params: {
      api_key: string;
      entityTypes?: string;
      limit?: string;
      radius?: string;
      savedFilterIds?: string;
      v: string;
    }
  }
}

// The projectConfig is used to maintain configuration for specific pages and sections in one place.
export const projectConfig: ProjectConfigType = {
  search: {
    apiKey: "b7930d2fa7b5b106371224158c5854d2",
    experienceKey: "locator",
    verticalKey: "locations",
  },
  nearby: {
    endpoint: 'https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch',
    params: {
      api_key: 'ae79e8eb05e10f03917d3f4836863ac7',
      entityTypes: 'location',
      limit: '4',
      radius: '50',
      savedFilterIds: '1003506731',
      v: '20220927',
    }
  }
}

export default config;
