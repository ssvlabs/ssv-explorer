import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import { Skeleton } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import OverviewStore from '~app/common/stores/Overview.store';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import { longStringShorten, truncateText } from '~lib/utils/strings';
import {
  overviewTableCellStyle,
  overviewTableHeadersStyle,
} from '~app/components/Overview/components/Tables/Operators/Operators';

type Props = {
  setValidatorsExist?: any;
};

const Validators = (props: Props) => {
  const { setValidatorsExist } = props;
  const classes = useStyles({});
  const [validators, setValidators] = useState(null);
  const [loadingValidators, setLoadingValidators] = useState(false);
  const stores = useStores();
  const overviewStore: OverviewStore = stores.Overview;

  useEffect(() => {
    if (validators === null && !loadingValidators) {
      loadValidators();
    }
  });

  /**
   * Load first page of validators
   */
  const loadValidators = () => {
    setLoadingValidators(true);
    SsvNetwork.getInstance().fetchValidators(1, ApiParams.PER_PAGE).then((result: any) => {
      overviewStore.setTotalValidators(result.data.pagination.total);
      if (result.data.validators.length > 0) setValidatorsExist(true);
      overviewStore.setTotalEth(result.data.pagination.total * 32);
      setValidators(result.data.validators);
      setLoadingValidators(false);
    });
  };

  return (
    <Table aria-label="Operators">
      <TableHead>
        <TableRow>
          <StyledCell style={overviewTableHeadersStyle}>Public Key</StyledCell>
          <StyledCell style={overviewTableHeadersStyle}>Operators</StyledCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(validators || []).map((row: any, rowIndex: number) => (
          <StyledRow key={rowIndex}>
            <StyledCell className={classes.operatorCellMobileResponse} style={overviewTableCellStyle}>
              <Link href={`/validators/${row.public_key}`} className={classes.Link}>
                0x{longStringShorten(row.public_key)}
              </Link>
            </StyledCell>
            <StyledCell style={overviewTableCellStyle}>
              {/* <Grid xs={12} className={classes.ValidatorOperatorsCellWrapper}> */}
              {row.operators.map((operator: any) => (
                <span key={`operator-link-${operator.address}`}>
                  <Link
                    href={`${config.routes.OPERATORS.HOME}/${operator.id}`}
                    className={`${classes.Link} ${classes.blackLinkColor}`}
                      >
                    {truncateText(operator.name, 12)}
                  </Link>
                      &nbsp;
                </span>
                  ))}
              {/* </Grid> */}
            </StyledCell>
          </StyledRow>
          ))}
        {loadingValidators && (
        <StyledRow key="validators-placeholder">
          <StyledCell style={overviewTableCellStyle}>
            <Skeleton />
          </StyledCell>
          <StyledCell style={overviewTableCellStyle}>
            <Skeleton />
          </StyledCell>
        </StyledRow>
          )}
      </TableBody>
    </Table>
  );
};

export default observer(Validators);
