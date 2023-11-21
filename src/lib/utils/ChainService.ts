// eslint-disable-next-line max-classes-per-file
import config from '~app/common/config';

export enum Chain {
    Holesky = 'holesky',
    Ethereum = 'mainnet', // ethereum
    Goerli = 'goerli',
    Prater = 'prater',
    UNDEFINED = 'undefined',
}

export const CHAIN = {
    HOLESKY: Chain.Holesky,
    ETHEREUM: Chain.Ethereum,
    PRATER: Chain.Prater, // Goerli was merged with Prater. The combined network retained the Goerli name post-merge.
    GOERLI: Chain.Goerli,
};

function extractChain(apiUrl: string): string {
    const match = apiUrl.match(/\/([^/]+)$/);
    if (match) {
        return match[1];
    }
    throw new Error('Failed to instantiate a chain service. Chain missing in api url.');
}

export interface IChain {
    chain: Chain
    getChainPrefix(): string
    getBeaconchaUrl(): string;
    getNetwork(): string
}

export abstract class BaseChain implements IChain {
    chain: Chain = Chain.UNDEFINED;

    static createChain() {
        const extractedChainName: string = extractChain(config.links.API_COMPLETE_BASE_URL);
        const ChainType = chainToHandler.get(extractedChainName) ?? (() => {
            throw new Error('Failed to instantiate a chain service. Provided chain name not supported.');
        })();
        return new ChainType();
    }

    getChainPrefix(): string {
        return `${this.chain}.`;
    }

    getBeaconchaUrl(): string {
        return `https://${this.getChainPrefix()}beaconcha.in`;
    }

    getNetwork(): string {
        return this.chain.toString();
    }

    // Add more chain/network related functions in the IChain interface and here(BaseChain) to extend functionality.
    // For chain specific functionality, override the function in the specific chain service.
    // See getChainPrefix in EthereumChain as an example.
}

export class EthereumChain extends BaseChain {
    chain: Chain = CHAIN.ETHEREUM;

    getChainPrefix(): string {
        return '';
    }
}

export class GoerliChain extends BaseChain {
    chain: Chain = CHAIN.GOERLI;
}

export class HoleskyChain extends BaseChain {
    chain: Chain = CHAIN.HOLESKY;
}

const chainToHandler: Map<string, { new(): IChain }> = new Map<string, new() =>IChain>([
    [CHAIN.ETHEREUM.toLowerCase(), EthereumChain],
    [CHAIN.HOLESKY.toLowerCase(), HoleskyChain],
    // Goerli was merged with Prater. The combined network retained the Goerli name post-merge.
    [CHAIN.PRATER.toLowerCase(), GoerliChain],
    [CHAIN.GOERLI.toLowerCase(), GoerliChain],
]);