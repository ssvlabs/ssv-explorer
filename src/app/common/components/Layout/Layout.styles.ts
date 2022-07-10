import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        marginTop: -50,
        paddingTop: 40,
        overflow: 'hidden',
    },
    ChildrenWrapper: {
        width: 1320,
        margin: 'auto',
        '@media (max-width: 1329px)': {
            width: 1152,
        },
    },
}));
