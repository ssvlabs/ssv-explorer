import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import ApiRequest from '~lib/utils/ApiRequest';

export enum IncentivizedType {
  // eslint-disable-next-line no-unused-vars
  operator = 'operator',
  // eslint-disable-next-line no-unused-vars
  validator = 'validator',
}

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
    let params: any = {
      page,
      perPage,
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/v1/validators/${detailed ? 'detailed/' : ''}?${params.toString()}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  async fetchOperators({ page = 1, perPage = ApiParams.PER_PAGE, extended = '' } : { page?: number, perPage?: number, extended?: string }) {
    let params: any = {
      page,
      perPage,
      extended,
    };

    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/v1/operators/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one operator by address
   * @param operatorAddress
   * @param performances
   */
  async fetchOperator(operatorAddress: string, performances: string[] = []) {
    let params: any = {
      performances: performances.join(','),
    };

    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/v1/operators/${operatorAddress}/?${params.toString()}`,
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
      page,
      perPage,
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/v1/validators/in_operator/${operatorAddress}/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one validator by address
   * @param validatorAddress
   * @param performances
   */
  async fetchValidator(validatorAddress: string, performances: string[] = []) {
    let params: any = {
      performances: performances.join(','),
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/v1/validators/${validatorAddress}/?${params.toString()}`;
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
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/v1/validators/duties/?${params.toString()}`;
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
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/v1/search/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Get inncetivized stats for operators or validators in given epoch ranges.
   *
   * @param type
   * @param address
   */
  async incentivized(type: IncentivizedType | string, address: string | undefined) {
    if (!type) {
      return null;
    }
    let params: any = {
      epochFrom: config.FEATURE.INCENTIVIZED.START_ROUNDS_FROM_EPOCH,
      epochsPerRound: config.FEATURE.INCENTIVIZED.EPOCHS_PER_ROUND,
      rounds: config.FEATURE.INCENTIVIZED.NUMBER_OF_ROUNDS,
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/v1/${type}s/incentivized/${address}/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  static getActiveNetwork() {
    const defaultNetwork = 'prater';
    try {
      return window.localStorage.getItem('chain_network') || defaultNetwork;
    } catch (e) {
      return defaultNetwork;
    }
  }
}

export default SsvNetwork;
