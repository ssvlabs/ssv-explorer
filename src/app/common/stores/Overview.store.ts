import { action, observable } from 'mobx';
import BaseStore from '~app/common/stores/BaseStore';
import ApiRequest from '~lib/utils/ApiRequest';
import config from '~app/common/config';

class OverviewStore extends BaseStore {
  @observable totalEth: number | null = null;
  @observable totalUsd: number | null = null;
  @observable totalOperators: number | null = null;
  @observable totalValidators: number | null = null;

  @action.bound
  setTotalOperators(totalOperators: number) {
    this.totalOperators = totalOperators;
  }

  @action.bound
  setTotalValidators(totalValidators: number) {
    this.totalValidators = totalValidators;
  }

  @action.bound
  setTotalEth(totalEth: number) {
    this.totalEth = totalEth;
    new ApiRequest({
      url: `${config.links.COIN_API_BASE_URL}/v1/exchangerate/ETH/USD?apikey=${config.COIN_API.API_KEY}`,
      method: 'GET',
      headers: [
        {
          name: 'Accept',
          value: 'application/json',
        },
      ],
    })
    .sendRequest()
    .then(({ data }: { data: any }) => {
      this.totalUsd = parseInt(String(data.rate), 10) * parseInt(String(this.totalEth), 10);
    });
  }

  @action.bound
  setTotalUsd(totalUsd: number) {
    this.totalUsd = totalUsd;
  }
}

export default OverviewStore;
