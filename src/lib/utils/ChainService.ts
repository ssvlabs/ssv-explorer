import { CHAIN, IChain } from '~lib/utils/BaseChain';
import { EthereumChain } from '~lib/utils/EthereumChain';
import { HoleskyChain } from '~lib/utils/HoleskyChain';
import { GoerliChain } from '~lib/utils/GoerliChain';

class ChainService {
    private chain: IChain;
    constructor(apiBaseUrl: string) {
        this.chain = this.createChain(apiBaseUrl);
    }
    
    static chainToHandler: Map<string, { new(): IChain }> = new Map<string, new() =>IChain>([
        [CHAIN.ETHEREUM.toLowerCase(), EthereumChain],
        [CHAIN.HOLESKY.toLowerCase(), HoleskyChain],
        // Goerli was merged with Prater. The combined network retained the Goerli name post-merge.
        [CHAIN.PRATER.toLowerCase(), GoerliChain],
        [CHAIN.GOERLI.toLowerCase(), GoerliChain],
    ]);

    private createChain(apiBaseUrl: string): IChain {
        const slashIndex: number = apiBaseUrl.lastIndexOf('/');
        if (slashIndex !== -1) {
            const chainName = apiBaseUrl.substring(slashIndex + 1);
            console.log(`Operating on ${chainName}`);
            const ChainType = ChainService.chainToHandler.get(chainName);
            if (ChainType) {
                return new ChainType();
            }
        }
        // TODO throw error? How to handle such case?
        throw new Error('Failed to instantiate a chain service');
    }

    getNetwork(): string {
        return this.chain.getNetwork();
    }
}

export default ChainService;