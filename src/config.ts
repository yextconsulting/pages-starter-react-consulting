import type { ConfigurationProviderContextType } from '@yext/sites-react-components';

const config: ConfigurationProviderContextType = {
  components: {},
};

export const projectConfig = {
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
      savedFilterIds: '',
      v: '20220927',
    }
  }
}

export default config;
