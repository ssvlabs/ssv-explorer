import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    gridContainer: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    TablesContainerWrapper: {
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    TablesWrapper: {
        gap: 24,
        maxWidth: 1320,
        display: 'flex',
        justifyContent: 'center',
    },
    mobileResponsive: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
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
}));