import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { Paper as MaterialPaper } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import { longStringShorten } from '~lib/utils/strings';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import ActiveCell from '~app/common/components/Table/ActiveCell';
import FullWidthLink from '~app/common/components/Links/FullWidthLink';

const Validators = () => {
  const [validators, setValidators] = useState([]);
  const [loadingValidators, setLoadingValidators] = useState(false);

  useEffect(() => {
    if (!validators.length && !loadingValidators) {
      loadValidators();
    }
  });

  /**
   * Load first page of validators
   */
  const loadValidators = () => {
    setLoadingValidators(true);
    SsvNetwork.getInstance().fetchValidators(1).then((result: any) => {
      setValidators(result.validators);
      setLoadingValidators(false);
    });
  };

  return (
    <TableContainer component={MaterialPaper}>
      <Table aria-label="Operators">
        <TableHead>
          <TableRow>
            <StyledCell>Public Key</StyledCell>
            <StyledCell>Operators</StyledCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {validators.map((row: any, rowIndex: number) => (
            <StyledRow key={rowIndex}>
              <StyledCell>
                <FullWidthLink href={`/validators/${row.publicKey}`}>
                  {longStringShorten(row.publicKey)}
                </FullWidthLink>
              </StyledCell>
              <StyledCell>
                <FullWidthLink href={`/validators/${row.publicKey}`}>
                  {row.operators.slice(0, 3).map((operator: any) => operator.name).join(', ')} &nbsp;
                  {row.operators.slice(3).length ? `+${row.operators.slice(3).length}` : ''}
                </FullWidthLink>
              </StyledCell>
            </StyledRow>
          ))}

          {loadingValidators && (
            <StyledRow key="validators-placeholder">
              <StyledCell>
                <Skeleton />
              </StyledCell>
              <StyledCell>
                <Skeleton />
              </StyledCell>
            </StyledRow>
          )}

          {validators.length ? (
            <TableRow>
              <ActiveCell colSpan={2}>
                <FullWidthLink href={config.routes.VALIDATORS.HOME}>
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

export default observer(Validators);
