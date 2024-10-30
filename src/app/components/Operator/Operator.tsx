import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
import ShowMoreText from '~app/common/components/ShowMoreText';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import MevRelaysBadge from '~app/common/components/MevRelaysBadge';
import OperatorDetails from '~app/common/components/OperatorDetails';
import { useStyles } from '~app/components/Operator/Operator.styles';
import ContentContainer from '~app/common/components/ContentContainer';
import { useWindowSize, WINDOW_SIZES } from '~app/hooks/useWindowSize';
import OperatorStatus from '~app/components/Operator/components/OperatorStatus';
import ValidatorCount from '~app/components/Operator/components/ValidatorsCount';
import OperatorPerformance from '~app/components/Operator/components/OperatorPerformance';
import ValidatorsInOperatorTable from '~app/components/Operator/components/ValidatorsInOperatorTable';
import { BreadCrumb, BreadCrumbDivider } from '~app/common/components/Breadcrumbs';
import { useStores } from '~app/hooks/useStores';

const Operator = () => {
  const params: any = useParams();
  const classes = useStyles();
  const windowSize = useWindowSize();
  const [loadingOperator, setLoadingOperator] = useState(false);
  const [loadingValidators, setLoadingValidators] = useState(false);
  const defaultOperator: Record<string, any> = {};
  const [operator, setOperator] = useState(defaultOperator);
  const [notFound, setNotFound] = useState(false);
  const defaultValidators: Record<string, any>[] | null = [];
  const [validators, setValidators] = useState(defaultValidators);
  const [validatorsPagination, setValidatorsPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const items = [
    { name: 'ETH1 node client', label: operator.eth1_node_client || '-' },
    { name: 'ETH2 node client', label: operator.eth2_node_client || '-' },
    { name: 'Cloud provider', label: operator.setup_provider || '-' },
    { name: 'Location', label: operator.location || '-' },
    { name: 'DKG Endpoint', label: operator.dkg_address || '-' },
  ];

  const BreadCrumbs = () => {
    return (
      <div className={classes.BreadCrumbExtendClass}>
        <BreadCrumb href={config.routes.HOME}>Overview</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={config.routes.OPERATORS.HOME}>Operators</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${operator.id}`}>{operator.name}</BreadCrumb>
      </div>
    );
  };

  const socialIcon = (url: string, imageSrc: string, className: string) => {
    return (url && (
    <Link href={url} target="_blank" className={className}>
      <img alt="social" src={imageSrc} className={className} />
    </Link>
    ));
  };

  const SocialMediaLinks = () => (
    <Grid xs={12} sm={3} md={2} lg={2} xl={2} className={classes.SocialMediaLinksWrapper}>
      {socialIcon(operator.twitter_url, '/images/socialMedia/twitter.svg', classes.SocialIcon)}
      {socialIcon(operator.linkedin_url, '/images/socialMedia/linkedin.svg', classes.SocialIcon)}
      {socialIcon(operator.website_url, '/images/socialMedia/website.svg', classes.SocialIcon)}
    </Grid>
  );

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
  const stores = useStores();

  return (
    <Grid className={classes.OperatorContainerWrapper}>
      <Grid item container className={classes.WhiteSection}>
        <BreadCrumbs />
        <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.OperatorDataAndLinksWrapper}>
          <Grid xs={12} sm={9}>
            <OperatorDetails large operator={operator} />
          </Grid>
          {windowSize.size !== WINDOW_SIZES.XS && (<SocialMediaLinks />)}
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.OperatorMetadataWrapper}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <ShowMoreText text={operator.description || ''} />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.MetadataItemsWrapper}>
            {items.map((item: any) => (
              <Grid xs={3} sm={3} item className={classes.itemWrapper}>
                <Grid item className={classes.itemHeader}>{item.name}</Grid>
                <Grid item className={classes.itemValue}>{item.label}</Grid>
              </Grid>
              ))}
          </Grid>
          {operator?.mev_relays && (
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.MevRelays}>
            <Grid item className={classes.itemHeader}>MEV relays supported</Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.MevRelaysListWrapper}>
              {operator?.mev_relays?.split(',').map((relay: string) => (
                <MevRelaysBadge label={relay.trim()} darkMode={stores.Application.darkMode} />
              ))}
            </Grid>
          </Grid>
)}
          {windowSize.size === WINDOW_SIZES.XS && (<SocialMediaLinks />)}
        </Grid>
      </Grid>
      <Layout>
        <ContentContainer>
          <NotFoundScreen notFound={notFound}>
            <Grid container className={classes.OperatorWrapper}>
              <Grid xs={12} sm={12} md={12} lg={3} xl={3} item className={classes.OperatorInfoWrapper}>
                <OperatorStatus status={operator.status} is_deleted={operator.is_deleted} is_valid={operator.is_valid} />
                <ValidatorCount validatorCount={operator.validators_count} />
                <OperatorPerformance operator={operator} isLoading={isLoading} />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={8} xl={7} item>
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
