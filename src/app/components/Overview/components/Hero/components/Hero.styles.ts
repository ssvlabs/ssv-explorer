import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    HeroContainer: {
        border: 0,
        flexGrow: 1,
        height: 200,
        maxWidth: '100%',
        display: 'flex',
        minHeight: 200,
        paddingBottom: 15,
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    HeroWrapper: {
        width: '1320px',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
            justifyContent: 'center',
        },
    },
    HeroHeader: {
        width: '100%',
        marginTop: 50,
        marginBottom: 30,
        color: theme.palette.text.primary,
        fontStyle: 'normal',
        fontWeight: 900,
        fontSize: 28,
        lineHeight: '120%',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
            justifyContent: 'center',
        },
    },
    SmartSearchWrapper: {
        flexBasis: '100%',
        width: '1320px',
    },
}));