import TableCell from '@material-ui/core/TableCell';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const StyledCell = withStyles((theme: Theme) => createStyles({
    head: {
        height: 36,
        margin: '12px 0px 0px',
        padding: '9px 7px 0px 33px',
        color: theme.colors.gray40,
    },
    body: {
        height: 64,
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.62,
        color: theme.colors.gray90,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            border: 'none',
            wordWrap: 'break-word',
        },
    },
}))(TableCell);

export default StyledCell;
