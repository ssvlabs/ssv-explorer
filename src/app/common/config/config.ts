const config = {
    routes: {
        HOME: '/',
        OPERATORS: {
            HOME: '/operators',
            OPERATOR: '/operators/:address?/:validatorsPage?',
        },
        VALIDATORS: {
            HOME: '/validators',
            VALIDATOR: '/validators/:address?/:dutiesPage?',
        },
    },
    FEATURE: {

    },
    links: {
        API_BASE_URL: '',
    },
};

export default config;
