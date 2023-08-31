import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Primary: {
        height: 48,
        width: 185,
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 8,
        lineHeight: 1.25,
        color: theme.colors.white,
        textTransform: 'capitalize',
        fontFamily: 'Manrope !important',
        backgroundColor: theme.colors.primaryBlue,
        '&:hover': {
            backgroundColor: theme.colors.shade20,
        },
        '&:active': {
            backgroundColor: theme.colors.shade40,
        },
        '&:disabled': {
            color: theme.colors.gray40,
            backgroundColor: theme.colors.gray20,
        },
    },
    Secondary: {
        height: 48,
        width: 100,
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 8,
        lineHeight: 1.25,
        transition: 'none',
        textTransform: 'capitalize',
        color: theme.colors.primaryBlue,
        fontFamily: 'Manrope !important',
        backgroundColor: theme.colors.tint90,
        '&:hover': {
            backgroundColor: theme.colors.tint80,
        },
        '&:active': {
            backgroundColor: theme.colors.tint70,
        },
        '&:disable': {
            color: theme.colors.gray40,
            backgroundColor: theme.colors.gray20,
        },
    },
}));
