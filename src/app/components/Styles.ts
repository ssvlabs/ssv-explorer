import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    WhiteSection: {
        width: '100%',
        height: 230,
        padding: '32px 32px 32px 220px',
        backgroundColor: theme.colors.white,
        [theme.breakpoints.down('lg')]: {
            padding: '32px 32px 32px 102px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '32px 32px 32px 55px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '32px 32px 32px 32px',
        },
    },
    mainContainer: {
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        minHeight: 600,
        padding: theme.spacing(4),
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
        flexDirection: 'row',
    },
    SmartSearchOperatorDataOption: {
      width: 'auto',
      display: 'flex',
      flexDirection: 'column',
      color: theme.colors.black,
      fontSize: 16,
      fontWeight: 500,
    },
    grayText: {
        fontSize: 14,
        color: theme.colors.gray40,
    },
    BlackText: {
        margin: 0,
        padding: 0,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.29,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    OperatorType: {
        width: 13,
        height: 13,
        marginLeft: 5,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    Verified: {
        width: 13,
        height: 13,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/verified_icon.svg)',
    },
    DappNode: {
        width: 13,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/dapp_node_icon.svg)',
    },
    passwordInput: {
        textSecurity: 'disc',
    },
    errorDiv: {
        paddingLeft: '10px',
        width: '100%',
        color: 'red',
        minHeight: '50px',
        lineHeight: '50px',
        backgroundColor: '#FDE6E5',
    },
    errorText: {},
    paddingTop: {
        marginTop: '100px',
    },
    inputWithHint: {
        backgroundColor: 'red',
        display: 'flex',
    },
    inputError: {
        border: '1px solid red',
    },
    textError: {
        fontSize: '0.8rem',
        color: 'red',
    },
    privateKeyTextInput: {
        marginBottom: '10px',
    },
    doneIcon: {
        color: 'green',
        float: 'left',
    },
    badFormat: {
        color: 'red',
        float: 'left',
    },
    fileNameText: {
        textAlign: 'left',
    },
    clearIcon: {
        float: 'right',
    },
    fileContainer: {
        display: 'flex',
        padding: '10px',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        alignContent: 'center',
        height: '50px',
        border: 'dashed thin gray',
    },
    guideStepsContainerPaper: {
        cursor: 'pointer',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        '&:hover': {
            backgroundColor: 'aliceblue',
        },
    },
    bigSquareButton: {
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    bigSquareButtonGrid: {
        margin: 'auto',
        textAlign: 'center',
    },
    bigSquareButtonIcon: {
        width: 30,
        height: 30,
        maxWidth: 30,
        maxHeight: 30,
        margin: 'auto',
    },
    gridContainer: {
        flexGrow: 1,
        flexDirection: 'column',

    },
    rowGridContainer: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    guideStep: {
        marginBottom: theme.spacing(1),
    },
    guideStepText: {
        fontSize: 14,
    },
    arrowIcon: {
        float: 'right',
        marginLeft: 'auto',
        marginRight: theme.spacing(1),
        alignSelf: 'center',
        marginTop: theme.spacing(1),
    },
    paperContainer: {
        padding: 30,
        '@media (max-width:1080px)': {
            padding: 15,
        },
    },
    condensedTableRows: {
        '& .MuiTableCell-body': {
            height: 34,
            fontSize: 14,
            maxHeight: 20,
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
    tableSubheaders: {
        marginTop: 10,
        marginBottom: 15,
        color: '#A1ACBE',
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 600,
    },
    Link: {
        fontSize: '16px',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        alignContent: 'center',
        cursor: 'pointer',
        flexDirection: 'row',
        color: `${theme.colors.primaryBlue}!important`,
        borderColor: `${theme.palette.text.primary}!important`,
    },
    blackLinkColor: {
        fontSize: '16px',
        color: `${theme.colors.gray90}!important`,
    },
    OperatorLogo: {
        width: 40,
        height: 40,
        borderRadius: 4,
        alignContent: 'flex-end',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginRight: theme.spacing(3),
        backgroundImage: 'url(/images/logo_placeholder.svg)',
    },
    CantBeEligible: {
        color: 'red',
    },
    overviewSearch: {
        '& > .MuiFormControl-root': {
            '& > .MuiInput-underline:after': {
                display: 'none',
            },
            '& > .MuiInputBase-root': {
                outline: 'none!important',
                backgroundColor: theme.colors.white,
                '-webkit-appearance': 'none',
                '&:hover': {
                  border: 'none',
                    borderBottom: 'none!important',
                },
                borderRadius: 8,
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 500,
                color: theme.colors.gray60,
                border: (props: any) => props.inAppBar && `1px solid ${theme.colors.gray30}`,
                '& > .MuiInputAdornment-root > .MuiButtonBase-root': {
                    width: 38,
                    height: 38,
                    marginRight: -13,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor: '#5B6C84',
                },
                '& > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label': {
                    color: 'white',
                },
            },
        },
    },
    appBarSearch: {
        display: 'inline-flex',
        '& > .MuiFormControl-root': {
            '& > .MuiInputBase-root': {
                width: 300,
                margin: 'auto',
                color: '#5B6C84',
                display: 'inline-flex',
                '@media (max-width:767px)': {
                    width: '100%',
                    margin: 0,
                },
                '& > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label': {
                    color: 'white',
                },

                '& > .MuiInputAdornment-root > .MuiButtonBase-root': {
                    borderColor: 'white',
                },
                '& > .MuiInputBase-input': {},
            },
        },
    },
    ValidatorOperatorsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    backgroundColorTest: {
        borderRadius: '16px',
        backgroundColor: theme.colors.white,
    },
    ValidatorDutiesWrapper: {
        borderRadius: '16px',
    },
    ConsensusWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    ConsensusOperatorSlot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    ConsensusOperatorId: {
        width: 52,
        flexGrow: 0,
        fontFamily: 'Manrope',
        fontSize: '10px!important',
        fontWeight: 300,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.62,
        letterSpacing: 0.5,
        color: '#63768b',
    },
    OperatorConsensusWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'space-between',
    },
    rhombus: {
      width: 20,
      height: 20,
      transform: 'rotate(45deg)',
      backgroundColor: theme.colors.primaryBlue,
    },
    line: {
        width: 32,
        height: 2,
        flexGrow: 0,
        borderRadius: 11,
        backgroundColor: '#d1edfe',
    },
    operatorCellMobileResponse: {
        [theme.breakpoints.down('xs')]: {
            width: '30%!important',
        },
    },
    OperatorDataLabel: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    ValidatorTableHeaderWrapper: {
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        backgroundColor: theme.colors.white,
        color: theme.colors.gray40,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 15px 0px 15px',
    },
    PerformanceSwitcher: {
        width: 32,
        height: 32,
        border: `1px solid ${theme.colors.gray40}`,
        float: 'right',
        fontSize: 16,
        color: theme.colors.gray40,
        fontWeight: 600,
        userSelect: 'none',
        cursor: 'pointer',
        borderRadius: '4px',

        padding: '5px 5px 5px 5px',
    },
    chosenPerformance: {
        width: 32,
        height: 32,
        fontWeight: 700,
        color: theme.colors.primaryBlue,
        border: `1px solid ${theme.colors.primaryBlue}`,
        borderRadius: '4px',
        padding: '5px 5px 5px 5px',
    },
    performanceButtonsWrapper: {
        width: 70,
        display: 'flex',
        justifyContent: 'space-between',
    },
    TableCellColor: {
        backgroundColor: theme.colors.white,
        color: theme.colors.gray40,
    },
    ValidatorListInfoBox: {
        gap: 16,
        display: 'flex',
    },
    ValidatorPublicKey: {
        fontSize: 16,
        fontWeight: 500,
        [theme.breakpoints.up('sm')]: {
            width: '100px',
        },
    },
    SingleValidatorWrapper: {
        gap: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tableWithBorder: {
        borderRadius: 6,
        fontSize: 18,
        '& h3': {
            color: theme.palette.divider,
            fontWeight: 900,
            fontSize: 18,
        },
        '& > .MuiTableContainer-root': {
            borderRadius: 6,
        },
        '& .MuiTableCell-head': {
            fontWeight: 'bold',
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#A1ACBE',
            maxHeight: 26,
            paddingTop: 8,
            paddingBottom: 8,
        },
    },
    OperatorListTitleWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    OperatorsCountLabel: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    operatorTopWrapper: {
        padding: '10px 32px 0 0',
        [theme.breakpoints.down('xs')]: {
            padding: '32px 32px 0 32px',
        },
    },
    TableStyledRow: {
        [theme.breakpoints.down('xs')]: {
            paddingBottom: '50px',
            width: '100%',
            height: 213,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.colors.gray20}`,
            margin: 32,
        },
    },
    TableCellLabel: {
        fontSize: 12,
        fontWeight: 500,
        width: 90,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    ListWrapper: {
      height: 'auto',
    },
    ValidatorOperatorsCellWrapper: {
        width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
        backgroundColor: 'aqua',
    },
    tableWrapper: {
        width: '100%',
    },
    statusPaddingTop: {
        paddingTop: 4,
    },
    SearchIcon: {
        margin: (props: any) => props.inAppBar ? '12px 10px 12px 12px' : '18px 15px 18px 20px',
    },
    ValidatorOperatorLink: {
        fontSize: 14,
        fontWeight: 500,
        display: 'flex',
        cursor: 'pointer',
        flexDirection: 'row',
        gap: 4,
        color: `${theme.colors.gray90}!important`,
    },
}));

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptopM: '960px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
};

export const mediaQueryDevices = {
    mobileS: `min-width: ${size.mobileS}`,
    mobileM: `min-width: ${size.mobileM}`,
    mobileL: `min-width: ${size.mobileL}`,
    tablet: `min-width: ${size.tablet}`,
    laptop: `min-width: ${size.laptop}`,
    laptopM: `min-width: ${size.laptopM}`,
    laptopL: `min-width: ${size.laptopL}`,
    desktop: `min-width: ${size.desktop}`,
    desktopL: `min-width: ${size.desktop}`,
};
