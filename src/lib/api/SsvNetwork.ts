import config from '~app/common/config';
import ApiRequest from '~lib/utils/ApiRequest';

class SsvNetwork {
  private readonly baseUrl: string = '';
  private static instance: SsvNetwork;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getInstance(): SsvNetwork {
    if (!SsvNetwork.instance) {
      let baseUrl: string = '';
      if (process.env.NODE_ENV === 'production') {
        baseUrl = config.links.API_BASE_URL;
      }
      SsvNetwork.instance = new SsvNetwork(baseUrl);
    }
    return SsvNetwork.instance;
  }

  async fetchValidators(page: number = 1, perPage: number = 10) {
    return new ApiRequest({
      url: `${this.baseUrl}/api/validators/?page=${page}&perPage=${perPage}`,
      method: 'GET',
    }).sendRequest();
  }

  async fetchOperators(page: number = 1, perPage: number = 10) {
    return new ApiRequest({
      url: `${this.baseUrl}/api/operators/?page=${page}&perPage=${perPage}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one operator by address
   * @param operatorAddress
   * @param page
   * @param perPage
   */
  async fetchOperator(operatorAddress: string, page: number = 1, perPage: number = 10) {
    return new ApiRequest({
      url: `${this.baseUrl}/api/operators/${operatorAddress}?page=${page}&perPage=${perPage}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Load statistics for overview page
   */
  async fetchStats() {
    return new ApiRequest({
      url: `${this.baseUrl}/api/overview`,
      method: 'GET',
    }).sendRequest();
  }
}

export default SsvNetwork;
