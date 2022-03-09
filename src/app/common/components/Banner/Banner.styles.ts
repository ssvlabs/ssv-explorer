import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    Wrapper: {
        margin: 'auto',
        marginBottom: 10,
        cursor: 'pointer',
    },
    Image: {
        width: 936,
        height: 100,
        margin: 'auto',
        borderRadius: 12,
        marginBottom: 10,
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent',
        backgroundImage: 'url(/images/banner/desk.gif)',
        '@media screen and (max-width: 1400px)': {
            height: 75,
            width: 400,
            marginTop: '25px !important',
            maxWidth: '95%',
            borderRadius: 12,
            backgroundImage: 'url(/images/banner/mobile.gif)',
        },
    },
}));
