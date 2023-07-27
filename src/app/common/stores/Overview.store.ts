import Decimal from 'decimal.js';
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
    const unversionUrl = config.links.API_COMPLETE_BASE_URL.replace(/(\/api\/).*/, '$1').replace(/\/+$/, '');
    this.totalEth = totalEth;
    if (SsvNetwork.getActiveNetwork() !== 'mainnet') {
      return;
    }
    new ApiRequest({
      url: `${unversionUrl}/finance/currency/convert/eth/usd`,
      method: 'GET',
    })
    .sendRequest()
    .then(({ data }: { data: any }) => {
     const result = new Decimal(Number(this.totalEth)).mul(new Decimal(data.price));
     this.setTotalUsd(Number(result.toFixed(0)));
    });
  }

  @action.bound
  setTotalUsd(totalUsd: number) {
    this.totalUsd = totalUsd;
  }
}

export default OverviewStore;
