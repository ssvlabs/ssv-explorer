import TableRow from '@material-ui/core/TableRow';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

const StyledRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default StyledRow;
