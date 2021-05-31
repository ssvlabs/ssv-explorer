import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
import { longStringShorten } from '~lib/utils/strings';
import DataTable from '~app/common/components/DataTable';
import FullWidthLink from '~app/common/components/Links/FullWidthLink';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';
import ContentContainer from '~app/common/components/ContentContainer';

const OperatorsList = () => {
  const [loading, setLoading] = useState(false);
  const [operators, setOperators] = useState([]);
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
      setOperators(result.operators);
      setPagination(result.pagination);
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

  useEffect(() => {
    if (!operators.length && !loading) {
      loadOperators();
    }
  }, [operators.length]);

  return (
    <Layout>
      <ContentContainer>
        <BreadCrumbsContainer>
          <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
        </BreadCrumbsContainer>

        <h1>Operators</h1>

        <DataTable
          headers={['Address', 'Name', 'Validators', 'Performance (24h)', 'Performance (All time)']}
          data={operators.map((operator: any) => {
            return [
              <FullWidthLink href={`${config.routes.OPERATORS.HOME}/${operator.address}`}>
                {longStringShorten(operator.address, 10)}
              </FullWidthLink>,
              <FullWidthLink href={`${config.routes.OPERATORS.HOME}/${operator.address}`}>
                {operator.name}
              </FullWidthLink>,
              <FullWidthLink href={`${config.routes.OPERATORS.HOME}/${operator.address}`}>
                {operator.validatorsCount}
              </FullWidthLink>,
              <FullWidthLink href={`${config.routes.OPERATORS.HOME}/${operator.address}`}>
                {`${operator.performance['24h']}%`}
              </FullWidthLink>,
              <FullWidthLink href={`${config.routes.OPERATORS.HOME}/${operator.address}`}>
                {`${operator.performance.all}%`}
              </FullWidthLink>,
            ];
          })}
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
