import { BaseChain, CHAIN, Chain } from '~lib/utils/BaseChain';

export class GoerliChain extends BaseChain {
    chain: Chain = CHAIN.GOERLI;
}