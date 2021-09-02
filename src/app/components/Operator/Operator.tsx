import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Skeleton } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { infoIconStyle } from '~root/theme';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import Layout from '~app/common/components/Layout';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import DataTable from '~app/common/components/DataTable/DataTable';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import { Heading, SubHeading } from '~app/common/components/Headings';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import OperatorType from '~app/components/Operator/components/OperatorType';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const StatsBlock = styled.div<({ maxWidth?: number })>`
  max-width: ${({ maxWidth }) => `${maxWidth ?? 200}px`};
`;

const OperatorNameContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  
  & > .label {
    margin-top: -5px;
  }
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

          <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <StatsBlock maxWidth={600} style={{ paddingRight: 15 }}>
                <Heading variant="h1" style={{ textTransform: 'none' }}>
                  {operator.name ? (
                    <OperatorNameContainer>
                      <div className="label">{operator.name}</div>
                      &nbsp;<OperatorType operator={operator} />
                    </OperatorNameContainer>
                  ) : (
                    <Skeleton />
                  )}
                </Heading>
                <SubHeading>
                  <Typography noWrap>
                    {params.address}
                  </Typography>
                  &nbsp;<CopyToClipboardIcon data={params.address} style={{ marginLeft: 5, width: 22, height: 22, marginTop: 5 }} />
                </SubHeading>
              </StatsBlock>
            </Grid>
            <Grid item xs={12} md={2}>
              <StatsBlock>
                <Heading variant="h1">{operator.validatorsCount ?? <Skeleton />}</Heading>
                <SubHeading>Validators</SubHeading>
              </StatsBlock>
            </Grid>
            <Grid item xs={12} md={2}>
              {config.FEATURE.IBFT.ENABLED ? (
                <StatsBlock>
                  <Heading variant="h1">{operator.performance?.all >= 0 ? `${parseFloat(String(operator.performance?.all || 0)).toFixed(2)}%` : <Skeleton />}</Heading>
                  <SubHeading>
                    Performance <InfoTooltip message="Operators technical scoring metric - calculated by the percentage of attended duties across all of their managed validators." style={infoIconStyle} />
                  </SubHeading>
                </StatsBlock>
              ) : ''}
            </Grid>
            <Grid item xs={12} md={2}>
              {config.FEATURE.IBFT.ENABLED ? (
                <StatsBlock>
                  <Heading variant="h1">{operator.status ? operator.status : <Skeleton />}</Heading>
                  <SubHeading>
                    Status <InfoTooltip message="Monitoring indication whether the operator is performing his network duties for the majority of his validators (per the last 2 epochs)." style={infoIconStyle} />
                  </SubHeading>
                </StatsBlock>
              ) : ''}
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
            isLoading={loadingValidators}
          />
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};

export default observer(Operator);
