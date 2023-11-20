export enum Chain {
    // eslint-disable-next-line no-unused-vars
    Holesky = 'holesky',
    // eslint-disable-next-line no-unused-vars
    Ethereum = 'ethereum',
    // eslint-disable-next-line no-unused-vars
    Goerli = 'goerli',
    // eslint-disable-next-line no-unused-vars
    Prater = 'prater',
    // eslint-disable-next-line no-unused-vars
    UNDEFINED = 'undefined',
}

export const CHAIN = {
    HOLESKY: Chain.Holesky,
    ETHEREUM: Chain.Ethereum,
    PRATER: Chain.Prater, // Goerli was merged with Prater. The combined network retained the Goerli name post-merge.
    GOERLI: Chain.Goerli,
};

export interface IChain {
    chain: Chain
    getBeaconchaUrl(): string;
    getNetwork(): string
}

export abstract class BaseChain implements IChain {
    chain: Chain = Chain.UNDEFINED;

    protected getChainPrefix(): string {
        return `${this.chain}.`;
    }

    getBeaconchaUrl(): string {
        return `https://${this.getChainPrefix()}beaconcha.in`;
    }

    getNetwork(): string {
        return this.chain.toString();
    }
}