import TableRow from '@material-ui/core/TableRow';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

const StyledRow = withStyles((theme: Theme) => createStyles({
  root: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.colors.gray20}`,
      margin: 32,
    },
  },
}))(TableRow);

export default StyledRow;
