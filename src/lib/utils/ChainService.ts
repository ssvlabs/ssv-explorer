// eslint-disable-next-line max-classes-per-file
import config from '~app/common/config';

export enum EChain {
    Holesky = 'holesky',
    Ethereum = 'mainnet', // ethereum
    Goerli = 'goerli',
    Prater = 'prater',
}

export const CHAIN = {
    HOLESKY: EChain.Holesky,
    ETHEREUM: EChain.Ethereum,
    PRATER: EChain.Prater, // Goerli was merged with Prater. The combined network retained the Goerli name post-merge.
    GOERLI: EChain.Goerli,
};

function extractChain(apiUrl: string): string {
    const match = apiUrl.match(/\/([^/]+)$/);
    if (match) {
        return match[1];
    }
    throw new Error('Failed to instantiate a chain service. Chain missing in api url.');
}

export interface IChain {
    chain: EChain | string
    getChainPrefix(): string
    getBeaconchaUrl(): string;
    getNetwork(): string
}

const baseChain = () => {
    let chain: EChain | string = '';
    const extractedChainName: string = extractChain(config.links.API_COMPLETE_BASE_URL);

    if (extractedChainName in EChain) {
        chain = extractedChainName;
    } else {
        throw new Error('Failed to instantiate a chain service. Provided chain name not supported.');
    }

    // static createChain() {
    //     const extractedChainName: string = extractChain(config.links.API_COMPLETE_BASE_URL);
    //     const ChainType = EChain[extractedChainName] chainToHandler.get(extractedChainName) ?? (() => {
    //         throw new Error('Failed to instantiate a chain service. Provided chain name not supported.');
    //     })();
    //     return new ChainType();
    // }
    //
    // getChainPrefix(): string {
    //     return `${this.chain}.`;
    // }
    //
    // getBeaconchaUrl(): string {
    //     return `https://${this.getChainPrefix()}beaconcha.in`;
    // }
    //
    // getNetwork(): string {
    //     return this.chain.toString();
    // }

    // Add more chain/network related functions in the IChain interface and here(BaseChain) to extend functionality.
    // For chain specific functionality, override the function in the specific chain service.
    // See getChainPrefix in EthereumChain as an example.
    const getChainPrefix = () => chain === EChain.Ethereum ? '' : `${chain}.`;

    const getBeaconchaUrl = () => `https://${getChainPrefix()}beaconcha.in`;

    const getNetwork = () => chain.toString();

    return { getBeaconchaUrl, getNetwork };
};

const chainService = baseChain();
export default chainService;

// export class EthereumChain extends BaseChain {
//     chain: Chain = CHAIN.ETHEREUM;
//
//     getChainPrefix(): string {
//         return '';
//     }
// }
//
// export class GoerliChain extends BaseChain {
//     chain: Chain = CHAIN.GOERLI;
// }
//
// export class HoleskyChain extends BaseChain {
//     chain: Chain = CHAIN.HOLESKY;
// }
//
// const chainToHandler: Map<string, { new(): IChain }> = new Map<string, new() =>IChain>([
//     [CHAIN.ETHEREUM.toLowerCase(), EthereumChain],
//     [CHAIN.HOLESKY.toLowerCase(), HoleskyChain],
//     // Goerli was merged with Prater. The combined network retained the Goerli name post-merge.
//     [CHAIN.PRATER.toLowerCase(), GoerliChain],
//     [CHAIN.GOERLI.toLowerCase(), GoerliChain],
// ]);
