import TableCell from '@material-ui/core/TableCell';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const StyledCell = withStyles((theme: Theme) => createStyles({
  head: {
    color: '#7F7F7F',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default StyledCell;
