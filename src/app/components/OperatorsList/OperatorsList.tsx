import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { infoIconStyle } from '~root/theme';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStores } from '~app/hooks/useStores';
import Status from '~app/common/components/Status';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import DataTable from '~app/common/components/DataTable';
import InfoTooltip from '~app/common/components/InfoTooltip';
import OverviewStore from '~app/common/stores/Overview.store';
import StyledCell from '~app/common/components/Table/StyledCell';
import OperatorDetails from '~app/common/components/OperatorDetails';
import ContentContainer from '~app/common/components/ContentContainer';
import { useWindowSize, WINDOW_SIZES } from '~app/hooks/useWindowSize';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const OPERATOR_CELL_LABEL_NAME = ['', 'Status', '1D Performance', 'Validators'];

const OperatorsList = () => {
  const stores = useStores();
  const classes = useStyles({});
  const windowSize = useWindowSize();
  const overviewStore: OverviewStore = stores.Overview;
  const defaultOperators: Record<string, any>[] = [];
  const [loading, setLoading] = useState(false);
  const [operators, setOperators] = useState(defaultOperators);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const isXsWindowSize = windowSize.size === WINDOW_SIZES.XS;

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
    SsvNetwork.getInstance().fetchOperators({ page, perPage, validatorsCount: 'true', status: 'true' })
      .then((result: any) => {
        overviewStore.setTotalOperators(result.data.pagination.total);
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
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.id}`} className={classes.Link}>
          <OperatorDetails operator={operator} />
        </Link>,
        <Box component="div" display={{ xs: 'block', sm: 'block', md: 'block', lg: 'block' }}>
          <Status entry={operator} />
        </Box>,
      ];

      const performance = operator.performance['24h'] || '0';

      data.push(
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.id}`} className={`${classes.Link} ${classes.blackLinkColor}`}>
          {`${parseFloat(String(performance)).toFixed(2)}%`}
        </Link>,
        <Link href={`${config.routes.OPERATORS.HOME}/${operator.id}`} className={`${classes.Link} ${classes.blackLinkColor}`}>
          {operator.validators_count}
        </Link>,
      );
      return data;
    });
  };

  const getCustomTableRows = () => {
    if (isXsWindowSize) {
      return getOperatorsTableData().map((row: any[], rowIndex: number) => {
        return (
          <Grid key={`row-key-${rowIndex}`} xs={10} className={classes.TableStyledRow}>
            {row.map((cell: any, cellIndex: number) => {
                return (
                  <Grid key={`cell-key-${cellIndex}`} xs={cellIndex > 0 ? 4 : 12}>
                    <StyledCell key={`cell-${cellIndex}`}>
                      <Typography className={classes.TableCellLabel}>
                        {OPERATOR_CELL_LABEL_NAME[cellIndex]}
                        {
                          OPERATOR_CELL_LABEL_NAME[cellIndex] === 'Status' && (
                            <InfoTooltip
                              message="Is the operator performing duties for the majority of its validators in the last 2 epochs."
                            />
                          )
                        }
                      </Typography>
                      {cell}
                    </StyledCell>
                  </Grid>
                );
              })}
          </Grid>
        );
      });
    }
    return null;
  };

  const getOperatorsTableHeaders = () => {
    return [
      'Name',
      <div>
        Status
        <InfoTooltip
          style={{ ...infoIconStyle, marginBottom: -2 }}
          message="Is the operator performing duties for the majority of its validators in the last 2 epochs."
        />
      </div>,
      '1D Performance',
      'Validators',
    ];
  };

  useEffect(() => {
    if (!operators.length && !loading) {
      loadOperators();
    }
  }, [operators.length]);

  return (
    <Layout>
      <Grid className={classes.ListWrapper}>
        <ContentContainer>
          <Grid className={classes.operatorTopWrapper}>
            <BreadCrumbsContainer>
              <BreadCrumb href={config.routes.HOME}>Overview</BreadCrumb>
              <BreadCrumbDivider />
              <BreadCrumb href={config.routes.OPERATORS.HOME}>Operators</BreadCrumb>
            </BreadCrumbsContainer>
            <Grid className={classes.OperatorListTitleWrapper}>
              <Typography variant="h1">Operators</Typography>
              {windowSize.size === WINDOW_SIZES.XS && overviewStore.totalOperators ? <Typography className={classes.OperatorsCountLabel} variant="h1">{`(${overviewStore.totalOperators} results)`}</Typography> : <Skeleton />}
            </Grid>
          </Grid>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <DataTable
              isLoading={loading}
              page={pagination.page - 1}
              onChangePage={loadOperators}
              totalCount={pagination.total}
              data={getOperatorsTableData()}
              headers={getOperatorsTableHeaders()}
              customRows={getCustomTableRows()}
              onChangeRowsPerPage={onChangeRowsPerPage}
              perPage={ApiParams.getInteger('operators', 'perPage', ApiParams.PER_PAGE)}
          />
          </Grid>
        </ContentContainer>
      </Grid>
    </Layout>
  );
};

export default observer(OperatorsList);
