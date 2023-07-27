import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
import ShowMoreText from '~app/common/components/ShowMoreText';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import OperatorDetails from '~app/common/components/OperatorDetails';
import { useStyles } from '~app/components/Operator/Operator.styles';
import ContentContainer from '~app/common/components/ContentContainer';
import OperatorStatus from '~app/components/Operator/components/OperatorStatus';
import ValidatorCount from '~app/components/Operator/components/ValidatorsCount';
import OperatorPerformance from '~app/components/Operator/components/OperatorPerformance';
import ValidatorsInOperatorTable from '~app/components/Operator/components/ValidatorsInOperatorTable';

const Operator = () => {
  const params: any = useParams();
  const classes = useStyles();
  const [loadingOperator, setLoadingOperator] = useState(false);
  const [loadingValidators, setLoadingValidators] = useState(false);
  const defaultOperator: Record<string, any> = {};
  const [operator, setOperator] = useState(defaultOperator);
  const [notFound, setNotFound] = useState(false);
  const defaultValidators: Record<string, any>[] | null = [];
  const [validators, setValidators] = useState(defaultValidators);
  const [validatorsPagination, setValidatorsPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const items = [
    { name: 'Node Version', label: 'N/A' },
    { name: 'ETH2 node client', label: operator.eth2_node_client || 'N/A' },
    { name: 'ETH1 node client', label: operator.eth1_node_client || 'N/A' },
    { name: 'Cloud provider', label: operator.setup_provider || 'N/A' },
    { name: 'Location', label: operator.location || 'N/A' },
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
      <Grid item container className={classes.WhiteSection}>
        <Grid item container className={classes.OperatorDetailsWrapper}>
          <Grid item>
          </Grid>
          <Grid item container justify={'space-between'}>
            <Grid item>
              <OperatorDetails large operator={operator} />
            </Grid>
            <Grid item container style={{ gap: 12, justifyContent: 'flex-end' }} xs>
              <Link href={operator.twitter_url} target={'_blank'} className={classes.SocialIcon}>
                <img src="/images/socialMedia/twitter.svg" className={classes.SocialIcon} />
              </Link>
              <Link href={operator.linkedin_url} target={'_blank'} className={classes.SocialIcon}>
                <img src="/images/socialMedia/linkedin.svg" className={classes.SocialIcon} />
              </Link>
              <Link href={operator.website_url} target={'_blank'} className={classes.SocialIcon}>
                <img src="/images/socialMedia/website.svg" className={classes.SocialIcon} />
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <ShowMoreText text={operator.description || ''} />
          </Grid> 
          <Grid item container style={{ gap: 80 }}>
            {items.map((item: any) => (
              <Grid item className={classes.itemWrapper}>
                <Grid item className={classes.itemHeader}>{item.name}</Grid>
                <Grid item className={classes.itemValue}>{item.label}</Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Layout>
        <ContentContainer>
          <NotFoundScreen notFound={notFound}>
            <Grid container className={classes.OperatorWrapper}>
              <Grid xs={12} sm={12} md={9} lg={12} xl={3} item className={classes.OperatorInfoWrapper}>
                <OperatorStatus status={operator.status} is_deleted={operator.is_deleted} />
                <ValidatorCount validatorCount={operator.validators_count} />
                <OperatorPerformance operator={operator} isLoading={isLoading} />
              </Grid>
              <Grid xs={12} sm={12} md={9} lg={10} xl={8} item>
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
          </NotFoundScreen>
        </ContentContainer>
      </Layout>
    </Grid>
  );
};

export default observer(Operator);
