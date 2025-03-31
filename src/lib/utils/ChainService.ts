// eslint-disable-next-line max-classes-per-file
import config from '~app/common/config';

export enum EChain {
  Holesky = 'holesky',
  Ethereum = 'mainnet', // ethereum
  Hoodi = 'hoodi',
}

export const CHAIN = {
  HOLESKY: EChain.Holesky,
  ETHEREUM: EChain.Ethereum,
  HOODI: EChain.Hoodi,
};

function extractChain(apiUrl: string): string {
  const match = apiUrl.match(/\/([^/]+)$/);
  if (match) {
    return match[1];
  }
  throw new Error(
    'Failed to instantiate a chain service. Chain missing in api url.',
  );
}

const chainService = () => {
  let chain: EChain | string = '';

  const extractedChainName: string = extractChain(
    config.links.API_COMPLETE_BASE_URL,
  );
  if (Object.values(EChain).includes(extractedChainName as EChain)) {
    chain = extractedChainName;
  } else {
    throw new Error(
      'Failed to instantiate a chain service. Provided chain name not supported.',
    );
  }
  const getChainPrefix = (): string => chain === EChain.Ethereum ? '' : `${chain}.`;
  const getBeaconchaUrl = (): string => `https://${getChainPrefix()}beaconcha.in`;
  const getNetwork = () => chain.toString();
  const isChain = (other: EChain): boolean => chain === other;

  const isCurrentNetworkTestnet = (): boolean => chain === EChain.Holesky || chain === EChain.Hoodi;

  return { getBeaconchaUrl, getNetwork, isChain, isCurrentNetworkTestnet };
};

export default chainService;
