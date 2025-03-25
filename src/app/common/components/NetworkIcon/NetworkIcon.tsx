import React, { ImgHTMLAttributes } from 'react';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Application.store';
import { EChain } from '~lib/utils/ChainService';

const NetworkIcon = (
  props: { isTestnet: boolean; network: EChain } & ImgHTMLAttributes<unknown>,
) => {
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;
  const imgSrc = `/images/networks/${props.isTestnet ? 'testnet' : 'mainnet'}${
    applicationStore.isDarkMode ? '_light' : '_dark'
  }.svg`;

  return (
    <img width="24" height="24" src={imgSrc} alt={props.network} {...props} />
  );
};

export default NetworkIcon;
