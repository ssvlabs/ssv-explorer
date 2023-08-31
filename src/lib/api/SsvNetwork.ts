import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import ApiRequest from '~lib/utils/ApiRequest';
import { NETWORKS } from '~lib/utils/networkHelper';

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
      SsvNetwork.instance = new SsvNetwork(config.links.API_COMPLETE_BASE_URL);
    }
    return SsvNetwork.instance;
  }

  async fetchValidators(page: number = 1, perPage: number = ApiParams.PER_PAGE) {
    let params: any = {
      page,
      perPage,
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/validators/?${params.toString()}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  async fetchOperators({
                         page = 1,
                         perPage = ApiParams.PER_PAGE,
                         validatorsCount = 'false',
                         status = 'false',
                       }: { page?: number, perPage?: number, validatorsCount?: string, status?: string }) {
    let params: any = {
      page,
      perPage,
      validatorsCount,
      status,
      ordering: 'validators_count:desc',
    };

    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/operators/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one operator by address
   * @param operatorAddress
   */
  async fetchOperator(operatorAddress: string) {
    let params: any = {};

    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/operators/${operatorAddress}/?${params.toString()}`,
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
      url: `${this.baseUrl}/validators/in_operator/${operatorAddress}/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Fetch one validator by address
   * @param validatorAddress
   */
  async fetchValidator(validatorAddress: string) {
    let params: any = {};
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/validators/${validatorAddress.replace('0x', '')}/?${params.toString()}`;
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
      page,
      perPage,
    };
    params = new URLSearchParams(params);
    const url = `${this.baseUrl}/duties/${validatorAddress.replace('0x', '')}/?${params.toString()}`;
    return new ApiRequest({
      url,
      method: 'GET',
    }).sendRequest();
  }

  /**
   * Search operators and validators
   * @param search
   */
  async search(search: string) {
    let params: any = {
      search,
      searchFor: search.length >= 3 ? 'both' : 'operators',
    };
    params = new URLSearchParams(params);
    return new ApiRequest({
      url: `${this.baseUrl}/search/?${params.toString()}`,
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
      url: `${this.baseUrl}/${type}s/incentivized/${String(address).replace('0x', '')}/?${params.toString()}`,
      method: 'GET',
    }).sendRequest();
  }

  static getActiveNetwork() {
    return config.links.API_COMPLETE_BASE_URL.includes(NETWORKS.PRATER) ? NETWORKS.PRATER : NETWORKS.MAINNET;
  }
}

export default SsvNetwork;
