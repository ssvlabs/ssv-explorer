import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.colors.gray10,
        flexGrow: 1,
        height: 'auto',
        marginTop: -50,
        padding: '40px 24px 40px 24px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '40px 0px 40px 0px',
        },
    },
    ChildrenWrapper: {
        height: '100vh',
        width: 1320,
        margin: '0 200px 0 200px',
        padding: '40px 24px 24px 40px',
    },
}));
