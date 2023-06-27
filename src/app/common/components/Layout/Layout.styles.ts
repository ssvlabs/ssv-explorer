import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        marginTop: -50,
        // padding: '40 24 24 40',
        padding: '40px 24px 40px 24px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '40px 0px 40px 0px',
        },
    },
    ChildrenWrapper: {
        // width: 1320,
        display: 'flex',
        justifyContent: 'center',
        // padding: '40px 24px 24px 40px',
        // backgroundColor: 'aqua',
        // margin: 'auto',
        // '@media (max-width: 1329px)': {
        //     width: 1152,
        // },
    },
}));
