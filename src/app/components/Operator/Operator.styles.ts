import { makeStyles } from '@material-ui/core/styles';

export const useStylesOperator = makeStyles(() => ({
    ItemContainer: {
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // backgroundColor: 'red',
    },
    OperatorLogo: {
        width: '56px',
        height: '56px',
        margin: '10px 24px 0 0',
        padding: '12px 14px 10px',
        backgroundPosition: 'center', /* Center the image */
        backgroundRepeat: 'no-repeat', /* Do not repeat the image */
        backgroundSize: 'contain',
        borderRadius: '4px',
        border: '1px solid #5b6c84',
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
        color: '#2a323e',
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
    },
}));
