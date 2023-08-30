import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    OperatorContainerWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },
    WhiteSection: {
        padding: '32px 0px 32px 0px',
        backgroundColor: theme.colors.white,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('lg')]: {
            padding: '32px 20px 32px 20px',
        },
        },
    MetadataItemsWrapper: {
        gap: 20,
        display: 'flex',
        marginTop: 40,
        [theme.breakpoints.down('sm')]: {
            gap: 50,
            display: 'flex',
            flexWrap: 'wrap',
        },
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
        },
    },
    itemWrapper: {
        flexDirection: 'column',
    },
    itemHeader: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    itemValue: {
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray90,
    },
    OperatorDetailsWrapper: {
        gap: 0,
        margin: '0 auto',
        maxWidth: 1320,
    },
    SocialIcon: {
        marginLeft: 12,
        width: 32,
        height: 32,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
    },
    ItemContainer: {
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    OperatorLogo: {
        width: '56px',
        height: '56px',
        margin: '10px 24px 0 0',
        padding: '12px 14px 10px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        borderRadius: '4px',
        marginTop: 25,
        '@media (max-width:1080px)': {
            width: '90px',
            height: '90px',
            padding: '20px 22px 15px 23px',
        },
    },
    OperatorName: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '440px',
        height: '35px',
        display: 'block',
        marginBottom: '8px',
        fontFamily: 'Encode Sans',
        fontSize: '28px',
        fontWeight: 900,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#2a323e',
        '@media (max-width:1080px)': {
            maxWidth: '320px',
        },
    },
    OperatorsDescription: {
        wordBreak: 'break-word',
        marginBottom: '20px',
    },
    OperatorsSocialNetworks: {
        marginBottom: '40px',
        alignItems: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        display: 'flex',
    },
    SocialNetwork: {
        display: 'inline-block',
        '&:not(:first-child)': {
            marginLeft: '20px',
        },
    },
    SocialNetworkImage: {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        '@media (max-width:1080px)': {
            width: '32px',
            height: '32px',
        },
    },
    DescriptionReadMore: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        margin: '0; padding: 30px 0',
    },
    SubDashboardFields: {
        marginBottom: '16px',
        '@media (max-width:1080px)': {
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
    },
    DashboardFields: {
        justifyContent: 'space-between',
    },
    OperatorFieldsHeader: {
        height: '20px',
        margin: '0 55px 0 0',
        display: 'block',
        fontSize: '14px',
        fontFamily: 'Encode Sans',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.43',
        letterSpacing: 'normal',
        '&.mainHeader': {
            height: '35px',
            fontSize: '28px',
            fontWeight: 600,
            lineHeight: 'normal',
            margin: '0 24px 8px 0',
            '@media (max-width:1080px)': {
                margin: '0 1px 8px 0',
            },
        },
        '@media (max-width:1080px)': {
            width: '214px',
        },
    },
    OperatorFieldsSubHeader: {
        width: '92px',
        height: '18px',
        margin: '0 20px 0 0',
        fontFamily: 'Encode Sans',
        fontSize: '14px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.5',
        letterSpacing: 'normal',
        color: '#a1acbe',
        '&.mainSubHeader': {
            width: '86px',
            margin: '0px 4px 0 0',
            lineHeight: '1.29',
            color: '#a1acbe',
        },
    },
    OperatorAddress: {
        width: '79px',
        height: '20px',
        fontFamily: 'Encode Sans',
        fontSize: '14px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.43',
        letterSpacing: 'normal',
        color: '#5b6c84',
        marginTop: -18,
        display: 'flex',
    },
    OperatorWrapper: {
        gap: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    MevRelays: {
        marginTop: 24,
    },
    MevRelaysListWrapper: {
        marginTop: 6,
        gap: 6,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    OperatorInfoWrapper: {
        gap: 24,
        [theme.breakpoints.down('lg')]: {
            marginRight: 50,
        },
        [theme.breakpoints.down('md')]: {
            marginRight: 0,
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
        },
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
        },
    },
    OperatorDataComponentWrapper: {
        display: 'flex',
        borderRadius: 16,
        flexDirection: 'column',
        padding: '32px 32px 32px 32px',
        backgroundColor: theme.colors.white,
    },
    LabelWrapper: {
        height: '50%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    SocialMediaLinksWrapper: {
        gap: 12,
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row-reverse',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'row',
        },
    },
    BreadCrumbExtendClass: {
        marginLeft: '230px',
        [theme.breakpoints.down('lg')]: {
            marginLeft: '70px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '32px',
        },
},
    OperatorDataAndLinksWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '32px 230px 32px 230px',
        [theme.breakpoints.down('lg')]: {
            padding: '32px 70px 32px 70px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '32px 50px 32px 50px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '32px 32px 32px 32px',
        },
    },
    OperatorMetadataWrapper: {
        padding: '0 320px 32px 320px',
        [theme.breakpoints.down('lg')]: {
            padding: '0 32px 32px 160px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0 32px 32px 140px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 32px 32px 32px',
        },
    },
}));
