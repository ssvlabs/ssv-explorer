import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import ApiRequest from '~lib/utils/ApiRequest';

class SsvNetwork {
  private readonly baseUrl: string = '';
  private static instance: SsvNetwork;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  static getInstance(): SsvNetwork {
    if (!SsvNetwork.instance) {
      SsvNetwork.instance = new SsvNetwork(config.links.API_BASE_URL);
    }
    return SsvNetwork.instance;
  }

  static get NETWORK() {
    return config.FEATURE.NETWORK.NAME;
  }

  async fetchValidators(page: number = 1, perPage: number = ApiParams.PER_PAGE, detailed = false) {
    let params: any = {
      page,
      perPage,
      network: SsvNetwork.NETWORK,
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/api/validators/${detailed ? 'detailed/' : ''}?${params.toString()}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  async fetchOperators(page: number = 1, perPage: number = ApiParams.PER_PAGE) {
    let params: any = {
      page,
      perPage,
      network: SsvNetwork.NETWORK,
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/api/operators/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one operator by address
   * @param operatorAddress
   */
  async fetchOperator(operatorAddress: string) {
    return new ApiRequest({
      url: `${this.baseUrl}/api/operators/${operatorAddress}/`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one operator by address
   * @param operatorAddress
   * @param page
   * @param perPage
   */
  async fetchOperatorValidators(operatorAddress: string, page: number = 1, perPage: number = ApiParams.PER_PAGE) {
    let params: any = {
      operator: operatorAddress,
      page,
      perPage,
      network: SsvNetwork.NETWORK,
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/api/validators/in_operator/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one validator by address
   * @param validatorAddress
   */
  async fetchValidator(validatorAddress: string) {
    let params: any = {
      network: SsvNetwork.NETWORK,
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/api/validators/${validatorAddress}/?${params.toString()}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Get list of duties paginated for validator
   * @param validatorAddress
   * @param page
   * @param perPage
   */
  async fetchValidatorDuties(validatorAddress: string, page = 1, perPage = ApiParams.PER_PAGE) {
    let params: any = {
      validator: validatorAddress,
      page,
      perPage,
      network: SsvNetwork.NETWORK,
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/api/validators/duties/?${params.toString()}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Search operators and validators
   * @param query
   */
  async search(query: string) {
    let params: any = {
      query,
      network: SsvNetwork.NETWORK,
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/api/search/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }
}

export default SsvNetwork;
