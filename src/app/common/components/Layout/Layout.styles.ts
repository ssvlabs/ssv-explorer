import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.colors.gray10,
        flexGrow: 1,
        minHeight: '100vh',
        padding: '40px 24px 40px 24px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '0px 0px 0px 0px',
        },
    },
    ChildrenWrapper: {
        height: 'auto',
        width: 1320,
        padding: '0px 24px 24px 40px',
        [theme.breakpoints.down('xs')]: {
            padding: '40px 0px 40px 0px',
        },
    },
}));
