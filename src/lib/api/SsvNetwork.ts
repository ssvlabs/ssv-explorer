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

  async fetchValidators(page: number = 1, perPage: number = ApiParams.PER_PAGE, detailed = false) {
    const url = `${this.baseUrl}/api/validators/${detailed ? 'detailed/' : ''}?page=${page}&perPage=${perPage}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  async fetchOperators(page: number = 1, perPage: number = ApiParams.PER_PAGE) {
    return new ApiRequest({
      url: `${this.baseUrl}/api/operators/?page=${page}&perPage=${perPage}`,
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
    return new ApiRequest({
      url: `${this.baseUrl}/api/validators/in_operator/?operator=${operatorAddress}&page=${page}&perPage=${perPage}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one validator by address
   * @param validatorAddress
   */
  async fetchValidator(validatorAddress: string) {
    const url = `${this.baseUrl}/api/validators/${validatorAddress}/`;
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
    const url = `${this.baseUrl}/api/validators/duties/?validator=${validatorAddress}&page=${page}&perPage=${perPage}`;
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
    return new ApiRequest({
      url: `${this.baseUrl}/api/search/?query=${query}`,
      method: 'GET',
    }).sendRequest();
  }
}

export default SsvNetwork;
