const config = {
    routes: {
        HOME: '/',
        OPERATORS: {
            HOME: '/operators',
            OPERATOR: '/operators/:address?',
        },
        VALIDATORS: {
            HOME: '/validators',
            VALIDATOR: '/validators/:address',
        },
    },
    FEATURE: {

    },
    links: {
        API_BASE_URL: String(process.env.REACT_APP_API_BASE_URL),
        LINK_SSV_WEBAPP: String(process.env.REACT_APP_LINK_SSV_WEBAPP),
        COIN_API_BASE_URL: 'https://rest.coinapi.io',
    },
    COIN_API: {
        API_KEY: '199192C7-3E2E-4730-995D-113D6654E525',
    },
};

export default config;
