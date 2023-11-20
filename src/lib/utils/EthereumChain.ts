import { BaseChain, CHAIN, Chain } from '~lib/utils/BaseChain';

export class EthereumChain extends BaseChain {
    chain: Chain = CHAIN.ETHEREUM;

    getChainPrefix(): string {
        return '';
    }
}