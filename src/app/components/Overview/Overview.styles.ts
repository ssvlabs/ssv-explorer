import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    gridContainer: {
        // marginTop: 100,
        flexGrow: 1,
        flexDirection: 'column',
        // alignItems: 'center',
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
}));