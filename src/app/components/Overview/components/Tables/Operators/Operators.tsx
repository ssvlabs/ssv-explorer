import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import { Skeleton } from '@material-ui/lab';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { Paper as MaterialPaper } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import { longStringShorten } from '~lib/utils/strings';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import ActiveCell from '~app/common/components/Table/ActiveCell';
import FullWidthLink from '~app/common/components/Links/FullWidthLink';

const Operators = () => {
  const [operators, setOperators] = useState([]);
  const [loadingOperators, setLoadingOperators] = useState(false);

  useEffect(() => {
    if (!operators.length && !loadingOperators) {
      loadOperators();
    }
  });

  /**
   * Load first page of operators
   */
  const loadOperators = () => {
    setLoadingOperators(true);
    SsvNetwork.getInstance().fetchOperators(1).then((result: any) => {
      setOperators(result.operators);
      setLoadingOperators(false);
    });
  };

  return (
    <TableContainer component={MaterialPaper}>
      <Table aria-label="Operators">
        <TableHead>
          <TableRow>
            <StyledCell>Address</StyledCell>
            <StyledCell>Name</StyledCell>
            <StyledCell>Validators</StyledCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {operators.map((row: any, rowIndex) => (
            <StyledRow key={rowIndex}>
              <StyledCell>
                <FullWidthLink href={`/operators/${row.address}`}>
                  {longStringShorten(row.address)}
                </FullWidthLink>
              </StyledCell>
              <StyledCell>
                <FullWidthLink href={`/operators/${row.address}`}>
                  {row.name}
                </FullWidthLink>
              </StyledCell>
              <StyledCell>
                <FullWidthLink href={`/operators/${row.address}`}>
                  {row.validatorsCount}
                </FullWidthLink>
              </StyledCell>
            </StyledRow>
          ))}

          {loadingOperators && (
            <StyledRow key="operators-placeholder">
              <StyledCell>
                <Skeleton />
              </StyledCell>
              <StyledCell>
                <Skeleton />
              </StyledCell>
              <StyledCell>
                <Skeleton />
              </StyledCell>
            </StyledRow>
          )}

          {operators.length ? (
            <TableRow>
              <ActiveCell colSpan={3}>
                <FullWidthLink href={config.routes.OPERATORS.HOME}>
                  Load more
                </FullWidthLink>
              </ActiveCell>
            </TableRow>
          ) : <TableRow />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(Operators);
