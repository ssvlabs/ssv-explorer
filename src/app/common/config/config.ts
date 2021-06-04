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
        API_BASE_URL: '',
    },
};

export default config;
