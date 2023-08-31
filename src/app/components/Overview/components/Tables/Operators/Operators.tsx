import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import OverviewStore from '~app/common/stores/Overview.store';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import OperatorDetails from '~app/common/components/OperatorDetails';

export const overviewTableHeadersStyle: any = { fontSize: 12, fontWeight: 500, color: '#97A5BA' };
export const overviewTableCellStyle: any = { fontSize: 14, height: 64, paddingLeft: 32, paddingTop: 0, paddingBottom: 0 };
type Props = {
    setOperatorsExist?: any;
};

const Operators = (props: Props) => {
  const { setOperatorsExist } = props;
  const classes = useStyles({});
  const [operators, setOperators] = useState(null);
  const [loadingOperators, setLoadingOperators] = useState(false);
  const stores = useStores();
  const overviewStore: OverviewStore = stores.Overview;

  useEffect(() => {
    if (operators === null && !loadingOperators) {
      loadOperators();
    }
  });

  /**
   * Load first page of operators
   */
  const loadOperators = () => {
    setLoadingOperators(true);
    SsvNetwork.getInstance().fetchOperators({ page: 1, validatorsCount: 'true' })
      .then((result: any) => {
        overviewStore.setTotalOperators(result.data.pagination.total);
        setOperatorsExist(result.data.pagination.total > 0);
        setOperators(result.data.operators);
        setLoadingOperators(false);
      });
  };

  return (

    <Table aria-label="Operators">
      <TableHead>
        <TableRow>
          <StyledCell style={overviewTableHeadersStyle}>Name Operator</StyledCell>
          <StyledCell style={overviewTableHeadersStyle}>Validators</StyledCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {(operators || []).map((row: any, rowIndex) => (
          <StyledRow key={rowIndex}>
            <StyledCell style={overviewTableCellStyle}>
              <Link href={`/operators/${row.id}`} className={classes.Link}>
                <OperatorDetails large={false} operator={row} />
              </Link>
            </StyledCell>
            <StyledCell style={overviewTableCellStyle}>
              {row.validators_count}
            </StyledCell>
          </StyledRow>
          ))}

        {loadingOperators ? (
          <StyledRow key="operators-placeholder">
            <StyledCell style={overviewTableCellStyle}>
              <Skeleton />
            </StyledCell>
            <StyledCell style={overviewTableCellStyle}>
              <Skeleton />
            </StyledCell>
            <StyledCell style={overviewTableCellStyle}>
              <Skeleton />
            </StyledCell>
          </StyledRow>
          ) : <></>}
      </TableBody>
    </Table>
  );
};

export default observer(Operators);
