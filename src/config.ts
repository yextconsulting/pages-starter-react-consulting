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
    apiKey: "<REPLACE-ME>",
    experienceKey: "locator",
    verticalKey: "locations",
  },
  nearby: {
    endpoint: 'https://liveapi.yext.com/v2/accounts/me/entities/geosearch',
    params: {
      api_key: '<REPLACE-ME>',
      entityTypes: 'location',
      limit: '4',
      radius: '50',
      // TODO: this could be predefined in the solution template
      savedFilterIds: '<REPLACE-ME>',
      v: '20220927',
    }
  }
}

export default config;
