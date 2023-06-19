import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    TableWrapper: {
        backgroundColor: theme.colors.white,
        '& .MuiTableCell-stickyHeader': {
            height: 16,
            backgroundColor: theme.colors.white,
        },
    },
    TablesWrapper: {
        gap: 24,
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
        // margin: 15px 34px 14px 4px;
        // padding: 5px 4px;
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    Verified: {
        width: 13,
        height: 13,
        // margin: 15px 34px 14px 4px;
        // padding: 5px 4px;
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/verified_icon.svg)',
    },
    DappNode: {
        width: 13,
        // margin: 15px 34px 14px 4px;
        // padding: 5px 4px;
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
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        alignContent: 'center',
        cursor: 'pointer',
        flexDirection: 'row',
        color: `${theme.colors.primaryBlue}!important`,
        borderColor: `${theme.palette.text.primary}!important`,
        // marginBottom: 12,
    },
    blackLinkColor: {
        fontSize: '14px',
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
        // '-webkit-box-shadow': 'none!important',
        // boxShadow: 'none!important',
        // outlineColor: 'red!important',
        // border: 'none !important',
        // outline: 'none !important',
        // '&.Mui-focused, &:focus-visible': {
        //   '& > .MuiFormControl-root': {
        //     borderImageWidth: 0,
        //     '-webkit-box-shadow': 'none!important',
        //     boxShadow: 'none!important',
        //     outlineColor: 'red!important',
        //     border: 'none !important',
        //     outline: 'none !important',
        //     '& > .MuiInputBase-root': {
        //       '-webkit-box-shadow': 'none!important',
        //       boxShadow: 'none!important',
        //       outlineColor: 'red!important',
        //       borderImageWidth: 0,
        //       border: 'none !important',
        //       outline: 'none !important',
        //     },
        //   },
        // },
        '& > .MuiFormControl-root': {
            // borderImageWidth: 0,
            // '& > .MuiInputBase-root.Mui-focused': {
            //   // border: '1px solid #5B6C84',
            //   borderImageWidth: 0,
            //   '-webkit-box-shadow': 'none!important',
            //   boxShadow: 'none!important',
            //   outlineColor: 'red!important',
            //   border: 'none !important',
            //   outline: 'none !important',
            // },
            '& > .MuiInputBase-root': {
                // '-webkit-box-shadow': 'none!important',
                // boxShadow: 'none!important',
                // outlineColor: 'red!important',
                outline: 'none!important',
                '-webkit-appearance': 'none',
                '&:hover': {
                  border: 'none',
                },
                borderRadius: 6,
                // backgroundColor: 'white',
                color: '#5B6C84',
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
        // [theme.breakpoints.down('sm')]: {
        //     maxWidth: '720px',
        // },
        // [theme.breakpoints.down('md')]: {
        //     width: '1152px',
        // },

    },
    ValidatorDutiesWrapper: {
        // [theme.breakpoints.down('sm')]: {
        //     maxWidth: '720px',
        // },
        // [theme.breakpoints.down('md')]: {
        //     width: '1152px',
        // },
        // [theme.breakpoints.down('xs')]: {
        //     width: '100%',
        //
        // },
        // [theme.breakpoints.down('sm')]: {
        //     width: '100%',
        //
        // },
        // [theme.breakpoints.down('lg')]: {
        //     maxWidth: 1152,
        //
        // },
        // [theme.breakpoints.up('lg')]: {
        //     maxWidth: 872,
        //
        // },
    },
    DutiesAndOperatorsWrapper: {
        // [theme.breakpoints.down('sm')]: {
        //     maxWidth: '720px',
        //     // backgroundColor: theme.palette.grey[300],
        // },
        // [theme.breakpoints.up('md')]: {
        //     // backgroundColor: theme.palette.grey[500],
        // },
        // [theme.breakpoints.up('lg')]: {
        //     // backgroundColor: theme.palette.grey[700],
        // },
    },
    ConsensusWrapper: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'space-around',
    },
    ConsensusOperatorSlot: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    ConsensusOperatorId: {
        width: 52,
        // height: 25,
        flexGrow: 0,
        fontFamily: 'Manrope',
        fontSize: '10px!important',
        fontWeight: 300,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.62,
        letterSpacing: 0.5,
        // textAlign: 'center',
        color: '#63768b',
        // marginRight: '32px!important',
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
