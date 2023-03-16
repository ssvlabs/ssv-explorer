import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import Layout from '~app/common/components/Layout';
import { longStringShorten } from '~lib/utils/strings';
import DataTable from '~app/common/components/DataTable';
import BeaconchaLink from '~app/common/components/BeaconchaLink';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const ValidatorsList = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [validators, setValidators] = useState([]);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  /**
   * Loading operators by page
   * @param paginationPage
   */
  const loadValidators = (paginationPage?: number) => {
    if (paginationPage) {
      ApiParams.saveInStorage('validators', 'page', paginationPage);
    }

    const page: number = ApiParams.getInteger('validators', 'page', 1);
    const perPage: number = ApiParams.getInteger('validators', 'perPage', ApiParams.PER_PAGE);

    setLoading(true);
    SsvNetwork.getInstance().fetchValidators(page, perPage).then((result: any) => {
      setValidators(result.data.validators);
      setPagination(result.data.pagination);
      setLoading(false);
    });
  };

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('validators', 'perPage', perPage);
    loadValidators(1);
  };

  useEffect(() => {
    if (!validators.length && !loading) {
      loadValidators();
    }
  }, [validators.length]);

  return (
    <Layout>
      <ContentContainer>
        <EmptyPlaceholder height={10} />
        {/* <Banner /> */}
        <BreadCrumbsContainer>
          <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
          <BreadCrumbDivider />
          <BreadCrumb href={config.routes.VALIDATORS.HOME}>validators</BreadCrumb>
        </BreadCrumbsContainer>

        <Typography variant="h1">Validators</Typography>

        <DataTable
          headers={['Public Key', 'Operators', '']}
          headersPositions={['left', 'left', 'right']}
          data={validators.map((validator: any) => {
            return [
              <Link href={`${config.routes.VALIDATORS.HOME}/${validator.public_key}`} className={classes.Link}>
                <Box component="div" display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
                  0x{longStringShorten(validator.public_key)}
                </Box>
                <Box component="div" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                  0x{validator.public_key}
                </Box>
              </Link>,
              validator.operators.map((operator: any, operatorIndex: number) => {
                return (
                  <span key={`operator-${operatorIndex}`}>
                    {operatorIndex !== 0 ? ', ' : ''}
                    <Link href={`${config.routes.OPERATORS.HOME}/${operator.id}`} className={classes.Link}>
                      {operator.name}
                    </Link>
                  </span>
                );
              }),
              <div style={{ marginTop: 3, display: 'block', whiteSpace: 'nowrap' }}>
                <CopyToClipboardIcon data={validator.public_key} />
                <BeaconchaLink height={24} width={24} address={`validator/${validator.public_key}`} />
              </div>,
            ];
          })}
          totalCount={pagination.total}
          page={pagination.page - 1}
          onChangePage={loadValidators}
          onChangeRowsPerPage={onChangeRowsPerPage}
          perPage={ApiParams.getInteger('validators', 'perPage', ApiParams.PER_PAGE)}
          isLoading={loading}
        />
      </ContentContainer>
    </Layout>
  );
};

export default observer(ValidatorsList);
