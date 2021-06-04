import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Skeleton } from '@material-ui/lab';
import { Divider } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TableContainer from '@material-ui/core/TableContainer';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import Layout from '~app/common/components/Layout';
import InfoTooltip from '~app/common/components/InfoTooltip';
import { capitalize, longStringShorten } from '~lib/utils/strings';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import DataTable from '~app/common/components/DataTable/DataTable';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import { SuccessChip, FailureChip, ChipLink } from '~app/common/components/Chips';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const Heading = styled.h1`
  margin-bottom: 0;
  text-transform: capitalize;
`;

const StatsBlock = styled.div<({ maxWidth?: number })>`
  max-width: ${({ maxWidth }) => `${maxWidth ?? 200}px`};
`;

const PerformanceSwitcher = styled.span<({ selected?: boolean })>`
  margin-top: 0;
  float: right;
  margin-left: 10px;
  font-size: 15px;
  font-weight: ${({ selected }) => selected ? 700 : 300};
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
  const params: Record<string, any> = useParams();
  const [loading, setLoading] = useState(false);
  const defaultOperator: Record<string, any> = {};
  const [notFound, setNotFound] = useState(false);
  const [validator, setValidator] = useState(defaultOperator);
  const [performance, setPerformance] = useState('all');
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const nonLinkBreadCrumbStyle = { color: 'black', display: 'flex', alignItems: 'center', alignContent: 'center' };
  const performanceRowStyle: any = {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 3,
    paddingBottom: 3,
  };
  const performanceRowRightStyle: any = { ...performanceRowStyle, textAlign: 'right', marginTop: 10 };

  /**
   * Fetch one operator by it's address
   * @param address
   * @param paginationPage
   */
  const loadValidator = (address: string, paginationPage: number) => {
    if (paginationPage) {
      ApiParams.saveInStorage('validator:duties', 'page', paginationPage);
    }
    const page: number = ApiParams.getInteger('validator:duties', 'page', 1);
    const perPage: number = ApiParams.getInteger('validator:duties', 'perPage', ApiParams.PER_PAGE);
    setLoading(true);
    SsvNetwork.getInstance().fetchValidator(address, page, perPage).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setTimeout(() => {
          setValidator(result.validator);
          setPagination(result.pagination);
          setLoading(false);
        }, 2000);
      }
    });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('validator:duties', 'perPage', perPage);
    loadValidator(params.address, 1);
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

  useEffect(() => {
    if (!validator.address && !loading) {
      loadValidator(params.address, 1);
    }
  }, [params.address, validator?.address]);

  return (
    <Layout>
      <ContentContainer>
        <BreadCrumbsContainer>
          <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={config.routes.VALIDATORS.HOME}>validators</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={`${config.routes.VALIDATORS.HOME}/${params.address}`}>
            {longStringShorten(params.address, 4)}
          </BreadCrumb>
        </BreadCrumbsContainer>

        <Grid container alignContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <StatsBlock maxWidth={400} style={{ paddingRight: 15 }}>
              <Heading>
                Validator
                {!notFound && (
                  <>
                    <CopyToClipboardIcon data={params.address} style={{ marginLeft: 15 }} />
                    <BeaconchaLink height={24} width={24} address={`validator/${params.address}`} />
                  </>
                )}
              </Heading>
              <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>
                <Typography noWrap>
                  {params.address}
                </Typography>
              </BreadCrumb>
            </StatsBlock>
          </Grid>
          {!notFound && (
            <>
              <Grid item xs={12} md={4}>
                <StatsBlock>
                  <Heading>{validator?.operators?.length ?? <Skeleton />}</Heading>
                  <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>Operators</BreadCrumb>
                </StatsBlock>
              </Grid>
              <Grid item xs={12} md={4}>
                <StatsBlock>
                  <Heading>{validator?.status ? validator.status : <Skeleton />}</Heading>
                  <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>
                    Status <InfoTooltip message="Status description" />
                  </BreadCrumb>
                </StatsBlock>
              </Grid>
            </>
          )}
        </Grid>

        <NotFoundScreen notFound={notFound}>
          <EmptyPlaceholder height={30} />

          <Grid container>
            <Grid item xs={12} md={3} style={{ marginTop: 1, marginBottom: 30 }}>
              <TableContainer className={classes.tableWithBorder}>
                <Grid container style={{ padding: 15 }}>
                  <Grid item xs={6} md={6}>
                    <h3 style={{ marginTop: 0 }}>Operators</h3>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <PerformanceSwitcher selected={performance === '24h'} onClick={() => setPerformance('24h')}>
                      24h
                    </PerformanceSwitcher>
                    <PerformanceSwitcher selected={performance === 'all'} onClick={() => setPerformance('all')}>
                      All Time
                    </PerformanceSwitcher>
                  </Grid>
                  <Grid container style={{ marginBottom: 15, color: '#7F7F7F' }}>
                    <Grid item xs={6} md={6}>
                      Name
                    </Grid>
                    <Grid item xs={6} md={6} style={{ textAlign: 'right', display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
                      Performance <InfoTooltip message="Performance description" />
                    </Grid>
                  </Grid>
                  <Grid container style={{ width: '100%' }}>
                    {!validator?.operators && (
                      <Grid item xs={12} md={12}>
                        <Skeleton />
                      </Grid>
                    )}
                    {getSortedOperators().map((operator: any, operatorIndex: number) => (
                      <span key={`operator-${operatorIndex}`} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <span style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                          <Grid item xs={6} md={6} style={performanceRowStyle}>
                            <Typography noWrap>
                              <Link
                                href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                                className={classes.Link}
                              >
                                {operator.name}
                              </Link>
                            </Typography>
                            <Typography noWrap style={{ fontSize: 12 }}>
                              <Link
                                href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                                className={classes.Link}
                              >
                                {longStringShorten(operator.address)}
                              </Link>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={6} style={performanceRowRightStyle}>
                            {parseFloat(String(operator.performance)).toFixed(2)}%
                          </Grid>
                        </span>
                        {operatorIndex + 1 < getSortedOperators().length ? <Divider /> : ''}
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
                data={(validator?.duties ?? []).map((duty: any) => {
                  return [
                    duty.epoch,
                    duty.slot,
                    capitalize(duty.duty),
                    capitalize(duty.status),
                    duty.operators.map((operator: any, operatorIndex: number) => (
                      <ChipLink
                        key={`operator-${operatorIndex}`}
                        href={`${config.routes.OPERATORS.HOME}/${operator.address}`}
                        className={classes.Link}
                      >
                        {operator.status === 'success' ? (
                          <SuccessChip
                            label={operator.name}
                            onDelete={() => {
                            }}
                          />
                        ) : (
                          <FailureChip
                            label={operator.name}
                            onDelete={() => {
                            }}
                            deleteIcon={<CheckCircleIcon />}
                          />
                        )}
                      </ChipLink>
                    )),
                  ];
                })}
                totalCount={pagination?.total || 0}
                page={(pagination?.page ?? 1) - 1}
                onChangePage={(page: number) => {
                  loadValidator(params.address, page);
                }}
                onChangeRowsPerPage={onChangeRowsPerPage}
                perPage={ApiParams.getInteger('validator:duties', 'perPage', ApiParams.PER_PAGE)}
                isLoading={loading}
              />
            </PaddedGridItem>
          </Grid>
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};
export default observer(Validator);
