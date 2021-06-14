import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Skeleton } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import Layout from '~app/common/components/Layout';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import DataTable from '~app/common/components/DataTable/DataTable';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const Heading = styled.h1`
  margin-bottom: 0; 
  text-transform: capitalize;
`;

const StatsBlock = styled.div<({ maxWidth?: number })>`
  max-width: ${({ maxWidth }) => `${maxWidth ?? 200}px`};
`;

const Operator = () => {
  const classes = useStyles();
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
  const nonLinkBreadCrumbStyle = { color: 'black', display: 'flex', alignItems: 'center', alignContent: 'center' };

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
        setOperator(result);
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
        setValidators(result.validators);
        setValidatorsPagination(result.pagination);
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
    if (!validators?.length && !loadingValidators) {
      loadOperatorValidators(params.address, 1);
    }
  }, [params.address, operator.address]);

  return (
    <Layout>
      <ContentContainer>
        <BreadCrumbsContainer>
          <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${params.address}`}>{longStringShorten(params.address, 4)}</BreadCrumb>
        </BreadCrumbsContainer>

        <NotFoundScreen notFound={notFound}>
          <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={5}>
              <StatsBlock maxWidth={400} style={{ paddingRight: 15 }}>
                <Heading>
                  {operator.name ? (
                    <>
                      {operator.name} <CopyToClipboardIcon data={params.address} />
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </Heading>
                <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>
                  <Typography noWrap>
                    {params.address}
                  </Typography>
                </BreadCrumb>
              </StatsBlock>
            </Grid>
            <Grid item xs={12} md={2}>
              <StatsBlock>
                <Heading>{operator.validatorsCount ?? <Skeleton />}</Heading>
                <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>Validators</BreadCrumb>
              </StatsBlock>
            </Grid>
            <Grid item xs={12} md={2}>
              <StatsBlock>
                <Heading>{operator.performance?.all >= 0 ? `${operator.performance?.all}%` : <Skeleton />}</Heading>
                <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>
                  Performance <InfoTooltip message="Performance description" />
                </BreadCrumb>
              </StatsBlock>
            </Grid>
            <Grid item xs={12} md={3}>
              <StatsBlock>
                <Heading>{operator.status ? operator.status : <Skeleton />}</Heading>
                <BreadCrumb style={nonLinkBreadCrumbStyle} className={classes.Link}>
                  Status <InfoTooltip message="Status description" />
                </BreadCrumb>
              </StatsBlock>
            </Grid>
          </Grid>

          <EmptyPlaceholder height={30} />

          <DataTable
            headers={['Validators', '']}
            headersPositions={['left', 'right']}
            data={(validators || []).map((validator: any) => {
              return [
                <Link href={`${config.routes.VALIDATORS.HOME}/${validator.publicKey}`} className={classes.Link}>
                  <Typography noWrap>
                    {validator.publicKey}
                  </Typography>
                </Link>,
                <>
                  <CopyToClipboardIcon data={validator.publicKey} />
                  <BeaconchaLink height={24} width={24} address={`validator/${validator.publicKey}`} />
                </>,
              ];
            })}
            totalCount={validatorsPagination.total}
            page={validatorsPagination.page - 1}
            onChangePage={(page: number) => { loadOperatorValidators(params.address, page); }}
            onChangeRowsPerPage={onChangeRowsPerPage}
            perPage={ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE)}
            isLoading={loadingValidators}
          />
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};

export default observer(Operator);
