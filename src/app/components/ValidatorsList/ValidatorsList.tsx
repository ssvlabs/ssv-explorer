import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import ApiParams, { PageDirection } from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import DataTable from '~app/common/components/DataTable';
import BeaconchaLink from '~app/common/components/BeaconchaLink';
import ContentContainer from '~app/common/components/ContentContainer';
import { useWindowSize, WINDOW_SIZES } from '~app/hooks/useWindowSize';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import { BreadCrumb, BreadCrumbDivider } from '~app/common/components/Breadcrumbs';
import Grid from '@material-ui/core/Grid';
import StyledCell from '~app/common/components/Table/StyledCell';

type HeaderPosition = 'inherit' | 'left' | 'center' | 'right' | 'justify';

const HEADER_POSITIONS: HeaderPosition[] = ['left', 'left', 'left'];
const VALIDATOR_CELL_LABEL_NAME = ['', '', 'Operators'];

const ValidatorsList = () => {
  const classes = useStyles({});
  const windowSize = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [validators, setValidators] = useState([]);
  const [pagination, setPagination] = useState(ApiParams.DEFAULT_PAGINATION);
  const [firstAndLastRecordIds, setLastRecordIds]: [number[], any] = useState([]);

  const isXsWindowSize = windowSize.size === WINDOW_SIZES.XS;
  /**
   * Loading operators by page
   * @param paginationPage
   */
  const loadValidators = (paginationPage?: number) => {
    const { page, perPage } = getGlobalPageData(paginationPage);
    setLoading(true);
    const directionAndRecord = getDirectionAndRecordId(paginationPage);
    SsvNetwork.getInstance().fetchValidators({ perPage, ...directionAndRecord }).then((result: any) => {
      setValidators(directionAndRecord.pageDirection === PageDirection.NEXT ? result.data.validators : result.data.validators.reverse());
      setPagination({ ...result.data.pagination, page });
      setLastRecordIds([result.data.pagination.current_first, result.data.pagination.current_last]);
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

  const getValidatorsTableData = () => {
    return validators.map((validator: any) => {
      return [
        <Link href={`${config.routes.VALIDATORS.HOME}/${validator.public_key}`} className={classes.Link}>
          <Box className={classes.ValidatorListInfoBox} component="div" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
            <Typography className={classes.ValidatorPublicKey}>
              0x{longStringShorten(validator.public_key, isXsWindowSize ? 6 : 4)}
            </Typography>
            <BeaconchaLink height={24} width={24} address={`validator/${validator.public_key}`} />
          </Box>
        </Link>,
        validator.operators.map((operator: any, operatorIndex: number) => {
          return (
            <span key={`operator-${operatorIndex}`}>
              {operatorIndex !== 0 ? ', ' : ''}
              <Link href={`${config.routes.OPERATORS.HOME}/${operator.id}`} className={`${classes.Link} ${classes.blackLinkColor}`}>
                {operator.name}
              </Link>
            </span>
          );
        }),
      ];
    });
  };

  const getGlobalPageData = (paginationPage?: number) => {
    if (paginationPage) {
      ApiParams.saveInStorage('validators', 'page', paginationPage);
    }
    const page: number = ApiParams.getInteger('validators', 'page', 1);
    const perPage: number = ApiParams.getInteger('validators', 'perPage', ApiParams.PER_PAGE);
    return { page, perPage };
  };

  const getDirectionAndRecordId = (paginationPage?: number): { lastFetchedRecordId?: number, pageDirection: PageDirection } => {
    const params: any = {
      pageDirection: PageDirection.NEXT,
      lastFetchedRecordId: 0,
    };

    if (paginationPage === undefined) {
      return params;
    }
    // last page
    if (paginationPage === pagination.pages) {
      params.pageDirection = PageDirection.PREV;
      delete params.lastFetchedRecordId;
    }
    // first page
    else if (paginationPage === 1) {
      params.lastFetchedRecordId = 1;
    }
    // previous page
    else if (paginationPage < pagination.page) {
      params.pageDirection = PageDirection.PREV;
      params.lastFetchedRecordId = firstAndLastRecordIds[0];
    }
    // next page
    else {
      params.lastFetchedRecordId = firstAndLastRecordIds[1];
    }
    return params;
  };

  const getCustomOwnTableRows = () => {
    if (isXsWindowSize) {
      return getValidatorsTableData().map((row: any[], rowIndex: number) => {
        return (
          <Grid key={`row-key-${rowIndex}`} xs={10} className={classes.TableStyledRow}>
            {row.map((cell: any, cellIndex: number) => {
                if (cellIndex === 1) {
                  return;
                }
                return (
                  <Grid key={`cell-key-${cellIndex}`} xs={12}>
                    <StyledCell
                      key={`cell-${cellIndex}`}
                      align={HEADER_POSITIONS?.length ? HEADER_POSITIONS[cellIndex] : undefined}
                      >
                      <Typography className={classes.TableCellLabel}>{VALIDATOR_CELL_LABEL_NAME[cellIndex]}</Typography>
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

  useEffect(() => {
    if (!validators.length && !loading) {
      loadValidators();
    }
  }, [validators.length]);

  return (
    <Layout>
      <Grid className={classes.ListWrapper}>
        <ContentContainer>
          <EmptyPlaceholder height={10} />
          <div>
            <BreadCrumb href={config.routes.HOME}>Overview</BreadCrumb>
            <BreadCrumbDivider />
            <BreadCrumb href={config.routes.VALIDATORS.HOME}>Validators</BreadCrumb>
          </div>
          <Typography variant="h1">Validators</Typography>
          <DataTable
            headers={['Public Key', 'Operators']}
            headersPositions={HEADER_POSITIONS}
            customRows={getCustomOwnTableRows()}
            data={getValidatorsTableData()}
            totalCount={pagination.total}
            page={pagination.page - 1}
            onChangePage={loadValidators}
            onChangeRowsPerPage={onChangeRowsPerPage}
            perPage={ApiParams.getInteger('validators', 'perPage', ApiParams.PER_PAGE)}
            isLoading={loading}
          />
        </ContentContainer>
      </Grid>
    </Layout>
  );
};

export default observer(ValidatorsList);
