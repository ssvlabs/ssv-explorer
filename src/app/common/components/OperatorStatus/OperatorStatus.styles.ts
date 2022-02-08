import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    OperatorActive: {
        height: 20,
        fontSize: 12,
        // margin: 0 103px 0 12px;
        fontWeight: 600,
        width: 'fit-content',
        padding: '2px 5px 3px 4px',
        color: 'rgb(6, 182, 79)',
        backgroundColor: 'rgba(6, 182, 79, 0.12)',
    },
    OperatorInactive: {
        height: 20,
        fontSize: 12,
        fontWeight: 600,
        // margin: 0 103px 0 12px;
        width: 'fit-content',
        padding: '2px 4px 3px',
        color: 'rgb(236, 28, 38)',
        backgroundColor: 'rgba(236, 28, 38, 0.12)',
    },
}));
