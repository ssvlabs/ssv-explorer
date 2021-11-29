import React from 'react';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import BeaconchaLink from '~app/common/components/BeaconchaLink';
import DataTable from '~app/common/components/DataTable/DataTable';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';

type ValidatorsInOperatorTableProps = {
  validators: any[],
  params: any,
  perPage: number,
  pagination: {
    total: number,
    page: number,
  },
  isLoading: boolean,
  // eslint-disable-next-line no-unused-vars
  onLoadPage: (address: string, page: number) => void,
  // eslint-disable-next-line no-unused-vars
  onChangeRowsPerPage: (perPage: number) => void,
};

const ValidatorsInOperatorTable = (props: ValidatorsInOperatorTableProps) => {
  const classes = useStyles();
  const { validators, pagination, params, isLoading, onLoadPage, onChangeRowsPerPage, perPage } = props;

  return (
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
      totalCount={pagination.total}
      page={pagination.page - 1}
      onChangePage={(page: number) => {
        onLoadPage && onLoadPage(params.address, page);
      }}
      onChangeRowsPerPage={(newPerPage: number) => {
        onChangeRowsPerPage && onChangeRowsPerPage(newPerPage);
      }}
      perPage={perPage}
      isLoading={isLoading}
    />
  );
};

export default ValidatorsInOperatorTable;
