import TableRow from '@material-ui/core/TableRow';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const StyledRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(242, 242, 242, 1)',
    },
  },
}))(TableRow);

export default StyledRow;
