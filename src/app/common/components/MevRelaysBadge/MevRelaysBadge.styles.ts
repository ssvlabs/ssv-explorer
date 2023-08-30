import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
        MevRelaysBadgeWrapper: {
            gap: 12,
            height: 36,
            display: 'flex',
            borderRadius: '8px',
            padding: '6px 12px',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: theme.colors.gray10,
        },
        MevIcon: {
            width: 24,
            height: 24,
        },
}));
