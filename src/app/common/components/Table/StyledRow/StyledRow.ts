import TableRow from '@material-ui/core/TableRow';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

const StyledRow = withStyles((theme: Theme) => createStyles({
  root: {
    // width: '100%',
    //     display: 'flex',
    //     // flexWrap: 'wrap',
    // maxWidth: '100%',
    // backgroundColor: 'aqua',
    [theme.breakpoints.down('xs')]: {
      // backgroundColor: 'aqua',
      height: 213,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.colors.gray20}`,
      margin: 32,
    },
  },
}))(TableRow);

export default StyledRow;
