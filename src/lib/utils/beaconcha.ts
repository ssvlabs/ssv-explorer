import { NETWORKS } from '~lib/utils/networkHelper';
import SsvNetwork from '~lib/api/SsvNetwork';

/**
 * If network Id is passed to the function from MetaMask it will be used first
 * Otherwise old behavior
 * @param networkId
 */
export const getBaseBeaconchaUrl = () => {
  const finalNetwork = SsvNetwork.getActiveNetwork();
  switch (finalNetwork) {
    case NETWORKS.PRATER:
      return 'https://prater.beaconcha.in';
    case NETWORKS.MAINNET:
      return 'https://beaconcha.in';
  }
};
