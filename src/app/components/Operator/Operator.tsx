import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';

const Operator = () => {
  const classes = useStyles();
  const params: any = useParams();
  const operatorState = useState(null);
  const operator: any = operatorState[0];
  const setOperator = operatorState[1];
  const [operatorFetched, setOperatorFetched] = useState(false);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  /**
   * Fetch one operator by it's address
   * @param address
   * @param paginationPage
   */
  const fetchOperator = (address: string, paginationPage: number) => {
    if (paginationPage) {
      ApiParams.saveInStorage('operator:validators', 'page', paginationPage);
    }
    const page: number = ApiParams.getInteger('operator:validators', 'page', 1);
    const perPage: number = ApiParams.getInteger('operator:validators', 'perPage', ApiParams.PER_PAGE);
    SsvNetwork.getInstance().fetchOperator(address, page, perPage).then((result: any) => {
      setOperator(result.operator);
      setPagination(result.pagination);
      setOperatorFetched(true);
    });
  };

  useEffect(() => {
    if (!operatorFetched && params.address) {
      fetchOperator(params.address, 1);
    }
  }, [operatorFetched, params.address]);

  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <h1>Operator: {operator?.address ?? ''}</h1>

        {operator && operator.validators.map((validator: any, validatorIndex: number) => (
          <div key={`validator-${validatorIndex}`}>Validator: {validator.publicKey}</div>
        ))}

        <Pagination
          count={pagination.pages}
          variant="outlined"
          shape="rounded"
          onChange={(_event, page) => fetchOperator(params.address, page)}
        />
      </Grid>
    </Layout>
  );
};

export default observer(Operator);
