import { makeStyles } from '@material-ui/core/styles';

export const useStylesOperator = makeStyles((theme) => ({
    operatorCellMobileResponse: {
      [theme.breakpoints.down('xs')]: {
          width: ({ cellIndex }: { cellIndex: number }) => cellIndex === 0 ? '66%' : '33%',
      },
    },
}));
