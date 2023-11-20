import { BaseChain, CHAIN, Chain } from '~lib/utils/BaseChain';

export class HoleskyChain extends BaseChain {
    chain: Chain = CHAIN.HOLESKY;
}