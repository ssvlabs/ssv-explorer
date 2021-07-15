import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import DataTable from '~app/common/components/DataTable';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import ContentContainer from '~app/common/components/ContentContainer';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const OperatorsList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const defaultOperators: Record<string, any>[] = [];
  const [operators, setOperators] = useState(defaultOperators);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  /**
   * Loading operators by page
   * @param paginationPage
   */
  const loadOperators = (paginationPage?: number) => {
    const validatorsInOperatorPage: number = ApiParams.getInteger('operators', 'page');
    if (validatorsInOperatorPage !== 1) {
      ApiParams.saveInStorage('operator:validators', 'page', 1);
    }
    if (paginationPage) {
      ApiParams.saveInStorage('operators', 'page', paginationPage);
    }

    const page: number = ApiParams.getInteger('operators', 'page', 1);
    const perPage: number = ApiParams.getInteger('operators', 'perPage', ApiParams.PER_PAGE);

    setLoading(true);
    SsvNetwork.getInstance().fetchOperators(page, perPage).then((result: any) => {
      setOperators(result.data.operators);
      setPagination(result.data.pagination);
      setLoading(false);
    });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('operators', 'perPage', perPage);
    loadOperators(1);
  };

  const getOperatorsTableData = () => {
    return (operators || []).map((operator: any) => {
      const data = [
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
          {longStringShorten(operator.address, 4)}
        </Link>,
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
          {operator.name}
        </Link>,
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
          {operator.validatorsCount}
        </Link>,
      ];

      if (config.FEATURE.IBFT.ENABLED) {
        data.push(
          <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
            {`${operator.performance['24h']}%`}
          </Link>,
        );
        data.push(
          <Link href={`${config.routes.OPERATORS.HOME}/${operator.address}`} className={classes.Link}>
            {`${operator.performance.all}%`}
          </Link>,
        );
      }

      return data;
    });
  };

  const getOperatorsTableHeaders = () => {
    const headers = [
      'Address',
      'Name',
      'Validators',
    ];

    if (config.FEATURE.IBFT.ENABLED) {
      headers.push('Performance (24h)');
      headers.push('Performance (All time)');
    }

    return headers;
  };

  useEffect(() => {
    if (!operators.length && !loading) {
      loadOperators();
    }
  }, [operators.length]);

  return (
    <Layout>
      <ContentContainer>
        <EmptyPlaceholder height={10} />

        <BreadCrumbsContainer>
          <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
        </BreadCrumbsContainer>

        <Typography variant="h1">Operators</Typography>

        <DataTable
          headers={getOperatorsTableHeaders()}
          data={getOperatorsTableData()}
          totalCount={pagination.total}
          page={pagination.page - 1}
          onChangePage={loadOperators}
          onChangeRowsPerPage={onChangeRowsPerPage}
          perPage={ApiParams.getInteger('operators', 'perPage', ApiParams.PER_PAGE)}
          isLoading={loading}
        />
      </ContentContainer>
    </Layout>
  );
};

export default observer(OperatorsList);
