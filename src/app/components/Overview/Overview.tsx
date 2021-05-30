import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { OutlinedInput, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Layout from '~app/common/components/Layout';
import { mediaQueryDevices, useStyles } from '~app/components/Styles';
import { Skeleton } from '@material-ui/lab';
import SsvNetwork from '~lib/api/SsvNetwork';
import { longStringShorten } from '~lib/utils/strings';

const HeroContainer = styled.div`
  height: 170px;
  min-height: 170px;
  background-color: #F2F2F2;
  width: 100%;
  border: 0;
  text-align: center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-bottom: 15px;

  @media (${mediaQueryDevices.tablet}) {
    height: 245px;
    min-height: 245px;
    padding-bottom: 0;
  }
`;

const HeroHeader = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const SearchButton = styled(IconButton)`
  height: 40px;
  width: 40px;
  border-radius: 0;
  float: right;
  margin-left: auto;
`;

const SearchInput = styled(OutlinedInput)`
  margin: auto;
  margin-top: 0;
  width: 90%;
  height: 40px;
  padding-left: 0;
  @media (${mediaQueryDevices.tablet}) {
    width: 500px;
  }
`;

const StatsContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;

  @media (${mediaQueryDevices.mobileS}) {
    flex-direction: column;
  }

  @media (${mediaQueryDevices.tablet}) {
    flex-direction: row;
    margin-top: -50px;
  }
`;

const StatsBlock = styled.div`
  height: 98px;
  min-height: 98px;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(242, 242, 242, 1);
  margin: auto;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  @media (${mediaQueryDevices.tablet}) {
    margin-right: 30px;
    margin-left: 30px;
    width: 200px;
    min-width: 200px;
    margin-top: auto;
    &:nth-child(1) {
      margin-left: auto;
    }

    &:last-child {
      margin-right: auto;
    }
  }
`;

const StatsBlockHeader = styled.div`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin: auto;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0;
`;

const StatsBlockContent = styled.div`
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin: auto;
  margin-top: 0;
  font-size: 14px;
`;

const OverviewPaper = styled(Paper)`
  margin: auto;
  padding: 0;
`;

const OverviewColumn = styled(Grid)`
  align-self: end;
`;

const OverviewContainer = styled(Grid)`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;

  @media (${mediaQueryDevices.tablet}) {
    margin-top: 15px;
  }

  @media (${mediaQueryDevices.laptopM}) {
    & > ${OverviewColumn} > ${OverviewPaper} {
      margin-left: auto;
      margin-right: auto;
      max-width: 600px;
    }

    & > ${OverviewColumn}:first-child > ${OverviewPaper} {
      margin-left: auto;
      margin-right: 15px;
    }

    & > ${OverviewColumn}:last-child > ${OverviewPaper} {
      margin-right: auto;
      margin-left: 15px;
    }
  }
`;

const OverviewHeader = styled.h3`
  margin-top: 0;
  padding-left: 20px;
  padding-top: 15px;
`;

const StyledTableRow = withStyles((theme: Theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme: Theme) => createStyles({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const LoadMore = styled(TableCell)`
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: lightyellow;
    user-select: none;
  }
`;

const Overview = () => {
  const classes = useStyles();
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({
    operatorsCount: 0,
    validatorsCount: 0,
    totalEth: 0,
    totalUsd: 0,
  });
  const [validators, setValidators] = useState([]);
  const operatorsState = useState([]);
  const operators: any[] = operatorsState[0];
  const setOperators = operatorsState[1];
  const [operatorsPagination, setOperatorsPagination] = useState({ page: 1, pages: 2 });
  const [validatorsPagination, setValidatorsPagination] = useState({ page: 1, pages: 2 });
  const [loadingMoreOperators, setLoadingMoreOperators] = useState(false);
  const [loadingMoreValidators, setLoadingMoreValidators] = useState(false);

  useEffect(() => {
    if (loadingStats) {
      SsvNetwork.getInstance().fetchStats().then((overview: any) => {
        setTimeout(() => {
          setStats(overview);
          setLoadingStats(false);
        }, 1500);
      });
    }
    if (!validators.length && !loadingMoreValidators) {
      loadMoreValidators();
    }
    if (!operators.length && !loadingMoreOperators) {
      loadMoreOperators();
    }
  }, [stats, loadingStats]);

  const onSearchClicked = async () => {
    console.log('TODO: search');
  };

  function validatorData(publicKey: string, operatorsCount: string[]) {
    return { publicKey, operators: operatorsCount };
  }

  const loadMoreValidators = () => {
    setLoadingMoreValidators(true);
    const validatorsList: any[] = Array.from(validators);
    for (let i = 0; i < 10; i += 1) {
      validatorsList.push(validatorData('0x123...654', ['Operator1', 'Operator2']));
      // @ts-ignore
    }
    setTimeout(() => {
      setValidatorsPagination({ pages: 100, page: validatorsPagination.page + 1 });
      // @ts-ignore
      setValidators(validatorsList);
      setLoadingMoreValidators(false);
    }, 1500);
  };

  const loadMoreOperators = () => {
    if (operatorsPagination.page < operatorsPagination.pages) {
      setLoadingMoreOperators(true);
      SsvNetwork.getInstance().fetchOperators(operatorsPagination.page).then((result: any) => {
        setTimeout(() => {
          // eslint-disable-next-line no-restricted-syntax
          for (const operator of result.operators) {
            operators.push(operator);
          }
          setOperatorsPagination(result.pagination);
          // @ts-ignore
          setOperators(operators);
          setLoadingMoreOperators(false);
        }, 1500);
      });
    }
  };

  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <HeroContainer>
          <HeroHeader>Discover the SSV Network</HeroHeader>
          <SearchInput
            data-testid="search"
            placeholder="Search for validators and operators..."
            endAdornment={(
              <InputAdornment position="end">
                <SearchButton
                  onClick={onSearchClicked}
                  edge="end"
                >
                  <SearchIcon />
                </SearchButton>
              </InputAdornment>
            )}
          />
        </HeroContainer>
        <StatsContainer>
          <StatsBlock>
            <StatsBlockHeader>
              {loadingStats && <Skeleton />}
              {!loadingStats ? stats.operatorsCount : ''}
            </StatsBlockHeader>
            <StatsBlockContent>
              {loadingStats ? <Skeleton /> : 'Operators'}
            </StatsBlockContent>
          </StatsBlock>
          <StatsBlock>
            <StatsBlockHeader>
              {loadingStats && <Skeleton />}
              {!loadingStats ? stats.validatorsCount : ''}
            </StatsBlockHeader>
            <StatsBlockContent>
              {loadingStats ? <Skeleton /> : 'Validators'}
            </StatsBlockContent>
          </StatsBlock>
          <StatsBlock>
            <StatsBlockHeader>
              {loadingStats && <Skeleton />}
              {!loadingStats ? `${stats.totalEth} ETH` : ''}
            </StatsBlockHeader>
            <StatsBlockContent>
              {loadingStats && <Skeleton />}
              {!loadingStats ? `$${stats.totalUsd} Staked` : ''}
            </StatsBlockContent>
          </StatsBlock>
        </StatsContainer>

        <OverviewContainer container spacing={5}>
          <OverviewColumn item xs={12} md={6}>
            <OverviewPaper>
              <OverviewHeader>Operators</OverviewHeader>
              <TableContainer component={Paper}>
                <Table aria-label="Operators" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Validators</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {operators.map((row: any, rowIndex) => (
                      <StyledTableRow key={rowIndex}>
                        <StyledTableCell align="left">{longStringShorten(row.address)}</StyledTableCell>
                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.validatorsCount}</StyledTableCell>
                      </StyledTableRow>
                    ))}

                    {loadingMoreOperators && (
                      <StyledTableRow key="operators-placeholder">
                        <StyledTableCell align="left">
                          <Skeleton />
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Skeleton />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Skeleton />
                        </StyledTableCell>
                      </StyledTableRow>
                    )}

                    {operatorsPagination.page < operatorsPagination.pages && !loadingMoreOperators && (
                      <TableRow>
                        <LoadMore colSpan={3} onClick={() => loadMoreOperators()}>
                          Load more
                        </LoadMore>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </OverviewPaper>
          </OverviewColumn>

          <OverviewColumn item xs={12} md={6}>
            <OverviewPaper>
              <OverviewHeader>Validators</OverviewHeader>
              <TableContainer component={Paper}>
                <Table aria-label="Operators" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Public Key</TableCell>
                      <TableCell align="right">Operators</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {validators.map((row: any, rowIndex: number) => (
                      <StyledTableRow key={rowIndex}>
                        <StyledTableCell align="left">{row.publicKey}</StyledTableCell>
                        <StyledTableCell align="right">{row.operators.join(', ')}</StyledTableCell>
                      </StyledTableRow>
                    ))}

                    {loadingMoreValidators && (
                      <StyledTableRow key="validators-placeholder">
                        <StyledTableCell align="left">
                          <Skeleton />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Skeleton />
                        </StyledTableCell>
                      </StyledTableRow>
                    )}

                    {validatorsPagination.page < validatorsPagination.pages && !loadingMoreValidators && (
                      <TableRow>
                        <LoadMore colSpan={2} onClick={() => loadMoreValidators()}>
                          Load more
                        </LoadMore>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </OverviewPaper>
          </OverviewColumn>
        </OverviewContainer>
      </Grid>
    </Layout>
  );
};

export default observer(Overview);
