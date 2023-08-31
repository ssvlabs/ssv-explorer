import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Wrapper: {
        gap: 6,
        alignItems: 'flex-start',
    },
    TextWrapper: {
        marginLeft: 16,
        flexDirection: 'column',
    },
    OperatorLogo: {
        borderRadius: 4,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(230, 234, 247, 0.5)',
        height: (props: any) => props.large ? 72 : 40,
        width: (props: any) => props.large ? 62.3 : 40,
        backgroundImage: (props: any) => `url(${props.operatorLogo || '/images/operator_default_background/light.svg'})`,
    },
    OperatorTypeWrapper: {
        marginTop: 4,
    },
    Name: {
        fontSize: (props: any) => props.large ? 28 : 16,
        fontWeight: (props: any) => props.large ? 800 : 500,
        lineHeight: (props: any) => props.large ? 1.24 : 1.62,
        color: (props: any) => props.gray80 ? theme.colors.gray80 : theme.colors.gray90,
    },
    OperatorType: {
        alignSelf: 'flex-start',
        paddingTop: 4,
    },
    Id: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
}));
