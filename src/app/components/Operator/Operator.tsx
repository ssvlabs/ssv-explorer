import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { infoIconStyle } from '~root/theme';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import Layout from '~app/common/components/Layout';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import ShowMoreText from '~app/common/components/ShowMoreText';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import DataTable from '~app/common/components/DataTable/DataTable';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import OperatorType from '~app/components/Operator/components/OperatorType';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import { useStylesOperator } from '~app/components/Operator/Operator.styles';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const Operator = () => {
  const classes = useStyles();
  const operatorClasses = useStylesOperator();
  const params: any = useParams();

  // Loading indicators
  const [loadingOperator, setLoadingOperator] = useState(false);
  const [loadingValidators, setLoadingValidators] = useState(false);

  // Operator
  const defaultOperator: Record<string, any> = {};
  const [operator, setOperator] = useState(defaultOperator);

  // Validators
  const [validatorsPagination, setValidatorsPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const defaultValidators: Record<string, any>[] | null = [];
  const [validators, setValidators] = useState(defaultValidators);
  const [notFound, setNotFound] = useState(false);
  const [dashboardFields] = useState([
    { name: 'validatorsCount', hint: false, displayName: 'Validators', toolTipText: null },
    { name: 'performance', hint: true, displayName: 'Performance', toolTipText: 'Operators technical scoring metric - calculated by the percentage of attended duties across all of their managed validators.' },
    { name: 'status', hint: true, displayName: 'Status', toolTipText: 'Monitoring indication whether the operator is performing his network duties for the majority of his validators (per the last 2 epochs).' },
  ]);
  const [subDashboardFields] = useState([
    { name: 'location', hint: false, displayName: 'Location' },
    { name: 'setup_provider', hint: false, displayName: 'Cloud Provider' },
    { name: 'eth1_node_client', hint: false, displayName: 'ETH1 node client' },
    { name: 'eth2_node_client', hint: false, displayName: 'ETH2 node client' },
  ]);
    const [socialNetworks] = useState([
        { name: 'website_url', image: '/images/web_icon.png' },
        { name: 'twitter_url', image: '/images/twitter_icon.png' },
        { name: 'linkedin_url', image: '/images/linkedin_icon.png' },
    ]);

  const operatorImage = {
    backgroundImage: `url(${operator.logo})`,
  };
  /**
   * Fetch one operator by it's address
   * @param address
   */
  const loadOperator = (address: string) => {
    setLoadingOperator(true);
    SsvNetwork.getInstance().fetchOperator(address).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setOperator(result.data);
        setLoadingOperator(false);
      }
    });
  };

  /**
   * Load all validators by operator address
   * @param address
   * @param paginationPage
   */
  const loadOperatorValidators = (address: string, paginationPage: number) => {
    if (paginationPage) {
      ApiParams.saveInStorage('operator:validators', 'page', paginationPage);
    }
    const page: number = ApiParams.getInteger('operator:validators', 'page', 1);
    const perPage: number = ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE);
    setLoadingValidators(true);
    SsvNetwork.getInstance().fetchOperatorValidators(address, page, perPage).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setValidators(result.data.validators);
        setValidatorsPagination(result.data.pagination);
        setLoadingValidators(false);
      }
    });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('operator:validators', 'perPage', perPage);
    loadOperatorValidators(params.address, 1);
  };

  const openInTab = (url: string) => {
    if (url.indexOf('http://') === -1 || url.indexOf('https://') === -1) {
      // eslint-disable-next-line no-param-reassign
      url = `https://${url}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (!operator.address && !loadingOperator) {
      loadOperator(params.address);
    }
    if (!validators?.length && !loadingValidators) {
      loadOperatorValidators(params.address, 1);
    }
  }, [params.address, operator.address]);

  return (
    <Layout>
      <ContentContainer>
        <NotFoundScreen notFound={notFound}>
          <EmptyPlaceholder height={10} />

          <BreadCrumbsContainer>
            <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
            <BreadCrumbDivider />
            <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
            <BreadCrumbDivider />
            <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${params.address}`}>{longStringShorten(params.address, 4)}</BreadCrumb>
          </BreadCrumbsContainer>

          <EmptyPlaceholder height={20} />

          <Grid container>
            <Grid container item justify={'space-between'}>
              <Grid item lg={6} md={12} xs={12}>
                <Grid style={{ marginBottom: '20px' }} container spacing={1}>
                  {operator.logo && (
                    <Grid item md="auto" xs={12}>
                      <div className={operatorClasses.OperatorLogo} style={operatorImage} />
                    </Grid>
                  )}
                  <Grid item>
                    <span className={operatorClasses.OperatorName}>
                      {operator.name}
                    </span>
                    <span className={operatorClasses.OperatorAddress}>
                      0x{longStringShorten(params.address, 4)}&nbsp;<CopyToClipboardIcon data={params.address} style={{ marginLeft: 5, width: 22, height: 22, verticalAlign: 'middle' }} />
                    </span>
                  </Grid>
                  <Grid item>
                    <OperatorType operator={operator} style={{ marginTop: '8px' }} />
                  </Grid>
                </Grid>
                <Grid container className={operatorClasses.SubDashboardFields} spacing={2}>
                  {subDashboardFields.map((field, index) => {
                    const operatorDashboardField = operator[field.name];
                    return (
                        operatorDashboardField ? (
                          <Grid item xs={12} md={'auto'} key={index}>
                            <div>
                              <span
                                className={`${operatorClasses.OperatorFieldsHeader}`}>{operator[field.name]}</span>
                              <Grid container alignItems={'center'}>
                                <Grid item>
                                  <span className={operatorClasses.OperatorFieldsSubHeader}>{field.displayName}</span>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                        ) : ''
                    );
                  })}
                </Grid>
                {operator.description && (
                <Grid item className={operatorClasses.OperatorsDescription}>
                  <ShowMoreText text={operator.description} />
                </Grid>
                )}
                <Grid item className={operatorClasses.OperatorsSocialNetworks}>
                  {socialNetworks.map((socialNetwork, index) => {
                    const operatorSocialNetwork = operator[socialNetwork.name];
                    return (
                        operatorSocialNetwork ? (
                          <div tabIndex={0} role="button" onKeyDown={() => {
                              openInTab(operator[socialNetwork.name]);
                            }} onClick={() => {
                              openInTab(operator[socialNetwork.name]);
                            }} className={operatorClasses.SocialNetwork} key={index}>
                            <img className={operatorClasses.SocialNetworkImage} src={socialNetwork.image} />
                          </div>
                        ) : ''
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Grid container className={operatorClasses.DashboardFields}>
                  {dashboardFields.map((field, index) => {
                    const FieldValue = field.name === 'performance' ? operator[field.name]?.all : operator[field.name];
                    const shouldBeGreen = field.name === 'status';
                    return (
                      <Grid xs={field.name === 'performance' ? 4 : 3} md={'auto'} item key={index}>
                        <div>
                          <span
                            style={{ color: shouldBeGreen ? '#08c858' : '' }}
                            className={`${operatorClasses.OperatorFieldsHeader} mainHeader`}>{FieldValue}</span>
                          <Grid container alignItems={'center'}>
                            <Grid item>
                              <span className={`${operatorClasses.OperatorFieldsSubHeader} mainSubHeader`}>{field.displayName}</span>
                            </Grid>
                            {field.hint && (
                              <Grid item>
                                <InfoTooltip style={{ ...infoIconStyle, verticalAlign: 'middle' }}
                                  message={field.toolTipText} />
                              </Grid>
                              )
                              }
                          </Grid>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <EmptyPlaceholder height={40} />

          <DataTable
            noDataMessage={'No validators'}
            headers={['Validators', '']}
            headersPositions={['left', 'right']}
            data={(validators || []).map((validator: any) => {
              return [
                <Link href={`${config.routes.VALIDATORS.HOME}/${validator.publicKey}`} className={classes.Link}>
                  <Typography noWrap>
                    <Box component="div" display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
                      0x{longStringShorten(validator.publicKey, 10)}
                    </Box>
                    <Box component="div" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                      0x{validator.publicKey}
                    </Box>
                  </Typography>
                </Link>,
                <div style={{ marginTop: 3, whiteSpace: 'nowrap' }}>
                  <CopyToClipboardIcon data={validator.publicKey} />
                  <BeaconchaLink height={24} width={24} address={`validator/${validator.publicKey}`} />
                </div>,
              ];
            })}
            totalCount={validatorsPagination.total}
            page={validatorsPagination.page - 1}
            onChangePage={(page: number) => { loadOperatorValidators(params.address, page); }}
            onChangeRowsPerPage={onChangeRowsPerPage}
            perPage={ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE)}
            isLoading={loadingValidators || loadingOperator}
          />
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};

export default observer(Operator);
