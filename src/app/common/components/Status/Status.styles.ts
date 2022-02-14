import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    Big: {
        height: 28,
        fontSize: 14,
        borderRadius: 2,
        fontWeight: 500,
        textAlign: 'center',
        width: 'fit-content',
        padding: '5px !important',
    },
    Normal: {
        height: 20,
        fontSize: 12,
        fontWeight: 600,
        width: 'fit-content',
    },
    Active: {
        color: 'rgb(6, 182, 79)',
        padding: '2px 5px 3px 4px',
        backgroundColor: 'rgba(6, 182, 79, 0.12)',
    },
    Inactive: {
        padding: '2px 4px 3px',
        color: 'rgb(236, 28, 38)',
        backgroundColor: 'rgba(236, 28, 38, 0.12)',
    },
}));
