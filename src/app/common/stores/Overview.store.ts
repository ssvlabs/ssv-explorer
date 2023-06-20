import { action, observable } from 'mobx';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import ApiRequest from '~lib/utils/ApiRequest';
import BaseStore from '~app/common/stores/BaseStore';

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
    if (SsvNetwork.getActiveNetwork() !== 'mainnet') {
      return;
    }
    new ApiRequest({
      url: `${config.links.API_BASE_URL}/api/currency/convert?eth=${totalEth}`,
      method: 'GET',
    })
    .sendRequest()
    .then(({ data }: { data: any }) => {
      this.totalUsd = data.usd ? parseInt(String(data.usd), 10) : NaN;
    });
  }

  @action.bound
  setTotalUsd(totalUsd: number) {
    this.totalUsd = totalUsd;
  }
}

export default OverviewStore;
