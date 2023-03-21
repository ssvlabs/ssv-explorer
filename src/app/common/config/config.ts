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
        INCENTIVIZED: {
            NUMBER_OF_ROUNDS: 5,
            EPOCHS_PER_ROUND: 3150,
            START_ROUNDS_FROM_EPOCH: 69084,
        },
        ANNOUNCEMENT: String(process.env.REACT_APP_ANNOUNCEMENT || '').trim(),
    },
    links: {
        API_BASE_URL: String(process.env.REACT_APP_API_BASE_URL),
        LINK_SSV_WEBAPP: String(process.env.REACT_APP_LINK_SSV_WEBAPP),
    },
};

export default config;
