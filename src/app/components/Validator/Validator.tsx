import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Skeleton } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { infoIconStyle } from '~root/theme';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import Layout from '~app/common/components/Layout';
import InfoTooltip from '~app/common/components/InfoTooltip';
import { capitalize, longStringShorten } from '~lib/utils/strings';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import DataTable from '~app/common/components/DataTable/DataTable';
import { Heading, SubHeading } from '~app/common/components/Headings';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import { SuccessChip, FailureChip, ChipLink } from '~app/common/components/Chips';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const useChipStyles = makeStyles(() => ({
  chip: {
    marginRight: 10,
    '& > .MuiChip-label': {
      display: 'inline-flex',
    },
  },
}));

const StatsBlock = styled.div<({ maxWidth?: any })>`
  max-width: ${({ maxWidth }) => `${Number.isNaN(maxWidth ?? 200) ? (maxWidth) : `${(maxWidth ?? 200)}px`}`};
`;

const PerformanceSwitcher = styled.span<({ selected?: boolean })>`
  margin-top: 0;
  float: right;
  margin-left: 10px;
  font-size: 15px;
  font-weight: ${({ selected }) => selected ? 900 : 600};
  user-select: none;
  cursor: pointer;
`;

const PaddedGridItem = styled(Grid)<({ paddingleft: number })>`
  padding-left: ${({ paddingleft }) => paddingleft > 0 ? `${paddingleft}px` : 'initial'};

  @media (max-width: 960px) {
    padding-left: 0;
  }
`;

const Validator = () =>
{
  const classes = useStyles();
  const chipClasses = useChipStyles();
  const params: Record<string, any> = useParams();

  // Loading indicators
  const [loadingValidator, setLoadingValidator] = useState(false);
  const [loadingDuties, setLoadingDuties] = useState(false);

  // Validator
  const defaultValidator: Record<string, any> = {};
  const [notFound, setNotFound] = useState(false);
  const [validator, setValidator] = useState(defaultValidator);
  const [performance, setPerformance] = useState('24h');

  // Duties
  const [dutiesPagination, setDutiesPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const defaultDuties: Record<string, any>[] | null = null;
  const [validatorDuties, setValidatorDuties] = useState(defaultDuties);

  const performanceRowStyle: any = {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
  };
  const performanceRowRightStyle: any = { ...performanceRowStyle, textAlign: 'right', marginTop: 13 };

  /**
   * Fetch one operator by it's address
   * @param address
   */
  const loadValidator = (address: string) => {
    setLoadingValidator(true);
    SsvNetwork.getInstance().fetchValidator(address).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setValidator(result.data);
        setLoadingValidator(false);
      }
    });
  };

  /**
   * Fetch all duties with pagination belonging to this validator
   * @param address
   * @param page
   */
  const loadValidatorDuties = (address: string, page: number) => {
    if (page) {
      ApiParams.saveInStorage('validator:duties', 'page', page);
    }
    const currentPage: number = ApiParams.getInteger('validator:duties', 'page', 1);
    const perPage: number = ApiParams.getInteger('validator:duties', 'perPage', ApiParams.PER_PAGE);
    setLoadingDuties(true);
    SsvNetwork.getInstance().fetchValidatorDuties(address, currentPage, perPage).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setValidatorDuties(result.data.duties);
        setDutiesPagination(result.data.pagination);
        setLoadingDuties(false);
      }
    });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('validator:duties', 'perPage', perPage);
    loadValidatorDuties(params.address, 1);
  };

  const getSortedOperators = () => {
    if (!validator?.operators) {
      return [];
    }
    return validator.operators.sort((o1: any, o2: any) => {
      if (o1.performance[performance] > o2.performance[performance]) {
        return -1;
      }
      if (o1.performance[performance] < o2.performance[performance]) {
        return 1;
      }
      return 0;
    }).map((operator: any) => {
      return { ...operator, performance: operator.performance[performance] };
    });
  };

  const getGroupedOperators = (operators: any[]) => {
    const successOperators: any[] = [];
    const failedOperators: any[] = [];
    operators.map((operator: any) => {
      if (operator.status === 'success') {
        successOperators.push(operator);
      } else {
        failedOperators.push(operator);
      }
      return null;
    });
    return (
      <>
        {successOperators.length ? (
          <SuccessChip
            className={chipClasses.chip}
            label={successOperators.map((o, oi) => (
              <ChipLink
                key={`operators-success-${oi}`}
                className={classes.Link}
                href={`${config.routes.OPERATORS.HOME}/${o.address}`}
                style={{ maxWidth: 100 }}
              >
                <Typography noWrap style={{ fontSize: 14 }}>{o.name}</Typography>
              </ChipLink>
              ))
            }
            onDelete={() => {}}
            deleteIcon={<CheckCircleIcon />}
          />
        ) : ''}
        {failedOperators.length ? (
          <FailureChip
            className={chipClasses.chip}
            label={failedOperators.map((o, oi) => (
              <ChipLink
                key={`operators-failed-${oi}`}
                className={classes.Link}
                href={`${config.routes.OPERATORS.HOME}/${o.address}`}
                style={{ maxWidth: 100 }}
              >
                <Typography noWrap style={{ fontSize: 14 }}>{o.name}</Typography>
              </ChipLink>
            ))}
            onDelete={() => {}}
          />
        ) : ''}
      </>
    );
  };

  useEffect(() => {
    if (!validator.publicKey && !loadingValidator) {
      loadValidator(params.address);
    }
    if (validatorDuties === null && !loadingDuties) {
      loadValidatorDuties(params.address, 1);
    }
  }, [params.address, validator?.publicKey, loadingValidator, loadingDuties]);

  const renderOperatorsWithIbft = () => {
    return (
      <>
        <Grid item xs={12} md={3} style={{ marginTop: 1, marginBottom: 30 }}>
          <TableContainer className={classes.tableWithBorder}>
            <Grid container style={{ padding: 15 }}>
              <Grid item xs={6} md={6}>
                <h3 style={{ marginTop: 0 }}>Operators</h3>
              </Grid>
              <Grid item xs={6} md={6} style={{ marginTop: 3 }}>
                <PerformanceSwitcher selected={performance === '24h'} onClick={() => setPerformance('24h')}>
                  24h
                </PerformanceSwitcher>
                <PerformanceSwitcher selected={performance === 'all'} onClick={() => setPerformance('all')}>
                  All Time
                </PerformanceSwitcher>
              </Grid>
              <Grid container style={{ marginBottom: 15, color: '#A1ACBE', textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>
                <Grid item xs={6} md={6}>
                  Name
                </Grid>
                <Grid item xs={6} md={6} style={{ textAlign: 'right', display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
                  Performance <InfoTooltip style={infoIconStyle} message="Operators technical scoring metric - calculated by the percentage of attended duties within a time-frame." />
                </Grid>
              </Grid>
              <Grid container style={{ width: '100%' }}>
                {!validator?.operators && (
                  <Grid item xs={12} md={12}>
                    <Skeleton />
                  </Grid>
                )}
                {getSortedOperators().map((operator: any, operatorIndex: number) => (
                  <span key={`operator-${operatorIndex}`} style={{ fontWeight: 500, fontSize: 14, display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <span style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                      <Grid item xs={6} md={6} style={performanceRowStyle}>
                        <Typography noWrap>
                          <Link
                            href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                            className={classes.Link}
                            style={{ fontWeight: 500, fontSize: 14 }}
                                  >
                            {operator.name}
                          </Link>
                        </Typography>
                        <Typography noWrap>
                          <Link
                            href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                            className={classes.Link}
                            style={{ fontWeight: 500, fontSize: 14 }}
                                  >
                            {longStringShorten(operator.address)}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={6} style={performanceRowRightStyle}>
                        {parseFloat(String(operator.performance)).toFixed(2)}%
                      </Grid>
                    </span>
                  </span>
                ))}
              </Grid>
            </Grid>
          </TableContainer>
        </Grid>
        <PaddedGridItem item xs={12} md={9} paddingleft={30}>
          <DataTable
            title="Duties"
            headers={['Epoch', 'Slot', 'Duty', 'Status', 'Operators']}
            data={(validatorDuties ?? []).map((duty: any) => {
              return [
                duty.epoch,
                duty.slot,
                capitalize(duty.duty),
                capitalize(duty.status),
                getGroupedOperators(duty.operators),
              ];
            })}
            totalCount={dutiesPagination?.total || 0}
            page={(dutiesPagination?.page ?? 1) - 1}
            onChangePage={(page: number) => {
              loadValidatorDuties(params.address, page);
            }}
            onChangeRowsPerPage={onChangeRowsPerPage}
            perPage={ApiParams.getInteger('validator:duties', 'perPage', ApiParams.PER_PAGE)}
            isLoading={loadingDuties}
          />
        </PaddedGridItem>
      </>
    );
  };

  const renderSimpleOperatorsTable = () => {
    const sortedOperators = getSortedOperators();
    return (
      <Grid item xs={12} md={12}>
        <DataTable
          hidePagination
          noDataMessage={'No operators'}
          headers={['Name', 'Address', '']}
          headersPositions={['left', 'left', 'right']}
          data={sortedOperators.map((operator: any) => {
            return [
              <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
                <Typography noWrap>
                  {operator.name}
                </Typography>
              </Link>,
              <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link} style={{ marginLeft: 'auto', marginRight: 0 }}>
                <Typography noWrap>
                  {operator.address}
                </Typography>
              </Link>,
              <div style={{ marginTop: 3, marginLeft: 'auto', marginRight: 0 }}>
                <CopyToClipboardIcon data={operator.address} />
              </div>,
            ];
          })}
          totalCount={sortedOperators.length}
          page={0}
          onChangePage={() => {}}
          onChangeRowsPerPage={() => {}}
          perPage={ApiParams.PER_PAGE}
          isLoading={loadingValidator}
        />
      </Grid>
    );
  };

  return (
    <Layout>
      <ContentContainer>
        <EmptyPlaceholder height={10} />

        <NotFoundScreen notFound={notFound}>
          <BreadCrumbsContainer>
            <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
            <BreadCrumbDivider />
            <BreadCrumb href={config.routes.VALIDATORS.HOME}>validators</BreadCrumb>
            <BreadCrumbDivider />
            <BreadCrumb href={`${config.routes.VALIDATORS.HOME}/${params.address}`}>
              {longStringShorten(params.address, 4)}
            </BreadCrumb>
          </BreadCrumbsContainer>

          <EmptyPlaceholder height={20} />

          <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <StatsBlock maxWidth="100%" style={{ paddingRight: 15 }}>
                <Heading variant="h1">
                  Validator
                  {!notFound && (
                    <>
                      <CopyToClipboardIcon data={params.address} style={{ marginLeft: 15, width: 22, height: 22 }} />
                      <BeaconchaLink height={22} width={22} address={`validator/${params.address}`} />
                    </>
                  )}
                </Heading>
                <SubHeading style={{ width: '100%' }}>
                  <Typography noWrap>
                    {params.address}
                  </Typography>
                </SubHeading>
              </StatsBlock>
            </Grid>
            {!notFound ? (
              <>
                <Grid item xs={12} md={2}>
                  <StatsBlock>
                    <Heading variant="h1">{validator?.operators?.length ?? <Skeleton />}</Heading>
                    <SubHeading>Operators</SubHeading>
                  </StatsBlock>
                </Grid>
                <Grid item xs={12} md={2}>
                  {config.FEATURE.IBFT.ENABLED ? (
                    <StatsBlock>
                      <Heading variant="h1">{validator?.status ? validator.status : <Skeleton />}</Heading>
                      <SubHeading>
                        Status <InfoTooltip style={{ ...infoIconStyle, marginTop: 2 }} message="Refers to the validator’s status in the SSV network (not beacon chain), and reflects whether its operators are consistently performing their duties (according to last 2 epochs)." />
                      </SubHeading>
                    </StatsBlock>
                  ) : ''}
                </Grid>
              </>
            ) : ''}
          </Grid>

          <EmptyPlaceholder height={40} />

          <Grid container>
            {config.FEATURE.IBFT.ENABLED ? renderOperatorsWithIbft() : renderSimpleOperatorsTable()}
          </Grid>
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};
export default observer(Validator);
