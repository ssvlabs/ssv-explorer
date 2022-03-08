import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    Wrapper: {
        height: 90,
        margin: 'auto',
        borderRadius: 8,
        marginBottom: 10,
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundImage: 'url(/images/banner/desk.gif)',
        '@media screen and (max-width: 424px)': {
            height: 62,
            margin: 'none',
            backgroundImage: 'url(/images/banner/mobile.gif)',
        },
    },
}));
