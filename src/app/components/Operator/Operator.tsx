import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
// import Banner from '~app/common/components/Banner';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
// import { Incentivized } from '~app/common/components/Incentivized';
import OperatorDetails from '~app/common/components/OperatorDetails';
import ContentContainer from '~app/common/components/ContentContainer';
// import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import BreadCrumbs from '~app/components/Operator/components/BreadCrumbs';
// import OperatorName from '~app/components/Operator/components/OperatorName';
// import OperatorInfo from '~app/components/Operator/components/OperatorInfo';
import { useStylesOperator } from '~app/components/Operator/Operator.styles';
import OperatorStatus from '~app/components/Operator/components/OperatorStatus';
import ValidatorCount from '~app/components/Operator/components/ValidatorsCount';
// import OperatorMetadata from '~app/components/Operator/components/OperatorMetadata';
// import OperatorDescription from '~app/components/Operator/components/OperatorDescription';
import OperatorPerformance from '~app/components/Operator/components/OperatorPerformance';
// import OperatorSocialNetworks from '~app/components/Operator/components/OperatorSocialNetworks';
import ValidatorsInOperatorTable from '~app/components/Operator/components/ValidatorsInOperatorTable';
import ShowMoreText from '~app/common/components/ShowMoreText';

const Operator = () => {
  // Params
  const params: any = useParams();
  const classes = useStylesOperator();
  // Loading indicators
  const [loadingOperator, setLoadingOperator] = useState(false);
  const [loadingValidators, setLoadingValidators] = useState(false);

  // Operator
  const defaultOperator: Record<string, any> = {};
  const [operator, setOperator] = useState(defaultOperator);

  // Validators
  const [notFound, setNotFound] = useState(false);
  const defaultValidators: Record<string, any>[] | null = [];
  const [validators, setValidators] = useState(defaultValidators);
  const [validatorsPagination, setValidatorsPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  const items = [
      { name: 'node_version', label: 'SSV node version' },
      { name: 'eth_node_2', label: 'ETH2 node client' },
      { name: 'eth_node_1', label: 'ETH1 node client' },
      { name: 'cloud_provider', label: 'Cloud provider' },
      { name: 'location', label: 'location' },
  ];

  /**
   * Fetch one operator by it's address
   * @param address
   */
  const loadOperator = (address: string) => {
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

  useEffect(() => {
    if (!operator.address && !loadingOperator) {
      loadOperator(params.address);
    }
    if (params.address && !validators?.length && !loadingValidators) {
      loadOperatorValidators(params.address, 1);
    }
  }, [params.address, operator.address]);

  const isLoading = loadingValidators || loadingOperator;

  return (
    <Grid>
      <Grid item container className={classes.WhiteSection} xs={12}>
        <Grid item container className={classes.OperatorDetailsWrapper}>
          <Grid item>
            <BreadCrumbs isOperator address={operator.name} />
          </Grid>
          <Grid item container justify={'space-between'}>
            <Grid item>
              <OperatorDetails large operator={operator} />
            </Grid>
            <Grid item container style={{ gap: 12, justifyContent: 'flex-end' }} xs>
              <img src="/images/socialMedia/website.svg" className={classes.SocialIcon} />
              <img src="/images/socialMedia/twitter.svg" className={classes.SocialIcon} />
              <img src="/images/socialMedia/linkedin.svg" className={classes.SocialIcon} />
              <img src="/images/socialMedia/discord.svg" className={classes.SocialIcon} />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <ShowMoreText text={'Blox Staking is an open-source, fully non-custodial platform for staking on Ethereum. The platform serves as an easy and accessible way to stake Ether and earn rewards, while akosdjskladjsakldnas lasjdnajks najskdnasjkdb akbdjkasbdhkasdbd abd habd asb hasb hbad hasb bdahsd basbdwbdjkqwbdjkqwbdjkqw bjdkqb jkqwb jkqw bdqjkbqwjkdbqwhjkdbqwd a dahdjkas doashdoiashioash ioas dioas udioasidoua soidjasiodiaosjdios'} />
          </Grid>
          <Grid item container style={{ gap: 80 }}>
            {items.map((item: any) => (
              <Grid item className={classes.itemWrapper}>
                <Grid item className={classes.itemHeader}>{item.label}</Grid>
                <Grid item className={classes.itemValue}>{item.name}</Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Layout>
        <ContentContainer>
          <NotFoundScreen notFound={notFound}>
            {/* <Banner /> */}
            {/* <EmptyPlaceholder height={10} /> */}
            {/* <BreadCrumbs isOperator address={operator.name} /> */}

            {/* /!*<Grid container>*!/ */}
            {/* /!*  <Grid container item justify="space-between">*!/ */}
            {/* /!*    <Grid item lg={6} md={12} xs={12}>*!/ */}
            {/* /!*      <OperatorName operator={operator} params={params} isLoading={isLoading} />*!/ */}
            {/* /!*      <OperatorMetadata operator={operator} isLoading={isLoading} />*!/ */}
            {/* /!*      <OperatorDescription operator={operator} isLoading={isLoading} />*!/ */}
            {/* /!*      <OperatorSocialNetworks operator={operator} isLoading={isLoading} />*!/ */}
            {/* /!*    </Grid>*!/ */}
            {/* /!*    <OperatorInfo operator={operator} isLoading={isLoading} />*!/ */}
            {/* /!*  </Grid>*!/ */}
            {/* /!*</Grid>*!/ */}
            <Grid container>
              <Grid container item justify="space-between" spacing={3}>
                <Grid item lg={3} md={6} xs={12}>
                  <OperatorStatus status={operator.status} is_deleted={operator.is_deleted} />
                  <ValidatorCount validatorCount={operator.validators_count} />
                  <OperatorPerformance operator={operator} isLoading={isLoading} />
                  {/* <Incentivized operator={params.address} /> */}
                </Grid>
                <Grid item lg={9} md={6} xs={12}>
                  <ValidatorsInOperatorTable
                    params={params}
                    isLoading={isLoading}
                    validators={validators}
                    pagination={validatorsPagination}
                    onLoadPage={loadOperatorValidators}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    perPage={ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE)}
                    />
                </Grid>
              </Grid>
            </Grid>
          </NotFoundScreen>
        </ContentContainer>
      </Layout>
    </Grid>
  );
};

export default observer(Operator);
