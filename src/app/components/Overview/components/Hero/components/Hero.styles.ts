import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    HeroContainer: {
        border: 0,
        flexGrow: 1,
        height: 200,
        width: '100%',
        display: 'flex',
        minHeight: 200,
        paddingBottom: 15,
        textAlign: 'center',
        alignContent: 'center',
        flexDirection: 'column',

//         @media (${mediaQueryDevices.tablet}) {
//         height: 245px;
//         min-height: 245px;
//         padding-bottom: 0;
    },
    HeroHeader: {
        marginTop: 50,
        marginBottom: 30,
        color: theme.palette.text.primary,
        fontStyle: 'normal',
        fontWeight: 900,
        fontSize: 28,
        lineHeight: '120%',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
            justifyContent: 'center',
        },
    },
    SmartSearchWrapper: {
        // width: 'auto',
        display: 'flex',
        justifyContent: 'center',

    },
}));