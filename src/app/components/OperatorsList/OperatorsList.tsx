import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { Pagination } from '@material-ui/lab';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';

const OperatorsList = () => {
  const classes = useStyles();
  const [operators, setOperators] = useState([]);
  const [operatorsFetched, setOperatorsFetched] = useState(false);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  const loadOperators = (paginationPage?: number) => {
    ApiParams.saveInStorage('operator:validators', 'page', 1);
    if (paginationPage) {
      ApiParams.saveInStorage('operators', 'page', paginationPage);
    }
    const page: number = ApiParams.getInteger('operators', 'page', 1);
    const perPage: number = ApiParams.getInteger('operators', 'perPage', ApiParams.PER_PAGE);
    SsvNetwork.getInstance().fetchOperators(page, perPage).then((result: any) => {
      setOperators(result.operators);
      setPagination(result.pagination);
      setOperatorsFetched(true);
    });
  };

  useEffect(() => {
    if (!operatorsFetched) {
      loadOperators();
    }
  }, [operatorsFetched]);

  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        Operators List
        {operators.map((operator: any, operatorIndex: number) => (
          <a key={`operator-${operatorIndex}`} href={`/operators/${operator.address}`}>{operator.address}</a>
        ))}

        <Pagination
          count={pagination.pages}
          variant="outlined"
          shape="rounded"
          onChange={(_event, page) => loadOperators(page)}
        />
      </Grid>
    </Layout>
  );
};

export default observer(OperatorsList);
