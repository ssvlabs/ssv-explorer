import React from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import ApiParams from '~lib/api/ApiParams';
import { useStyles } from '~app/components/Styles';
import StyledRow from '~app/common/components/Table/StyledRow';
import StyledCell from '~app/common/components/Table/StyledCell';
import PaginationActions from '~app/common/components/DataTable/components/PaginationActions';

type DataTableProps = {
  headers: string[],
  data: any[],
  rowsPerPageOptions?: number[],
  totalCount: number,
  perPage?: number,
  page: number,
  isLoading?: boolean,
  // eslint-disable-next-line no-unused-vars
  onChangePage?: (page: number) => void,
  // eslint-disable-next-line no-unused-vars
  onChangeRowsPerPage?: (event: any) => void,
};

const defaultPerPageOptions = [10, 25, 50, 100];
const skeletons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const DataTable = (props: DataTableProps) => {
  const { headers, data, rowsPerPageOptions, totalCount, perPage, page, isLoading,
    onChangePage, onChangeRowsPerPage } = props;
  const classes = useStyles();

  return (
    <div className={classes.tableWithBorder}>
      {perPage && perPage > defaultPerPageOptions[0] && (
      <TablePagination
        ActionsComponent={PaginationActions}
        colSpan={headers.length}
        rowsPerPageOptions={rowsPerPageOptions ?? defaultPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={perPage ?? ApiParams.PER_PAGE}
        page={page}
        onChangePage={(event: any, changedPage: number) => onChangePage ? onChangePage(changedPage + 1) : null}
        onChangeRowsPerPage={(event: any) => onChangeRowsPerPage ? onChangeRowsPerPage(event.target.value) : null}
          />
        )}

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledRow>
              {headers.map((header: string) => (
                <StyledCell key={header}>
                  {header}
                </StyledCell>
                ))}
            </StyledRow>
          </TableHead>
          <TableBody>
            {!isLoading && data.map((row: any[], rowIndex: number) => (
              <StyledRow hover role="checkbox" tabIndex={-1} key={`row-${rowIndex}`}>
                {row.map((cell: any, cellIndex: number) => (
                  <StyledCell key={`cell-${cellIndex}`}>
                    {cell}
                  </StyledCell>
                  ))}
              </StyledRow>
              ))}
            {isLoading && skeletons.map((rowIndex: number) => (
              <StyledRow hover role="checkbox" tabIndex={-1} key={`row-${rowIndex}`}>
                {headers.map((header: string) => (
                  <StyledCell key={`cell-${header}`}>
                    <Skeleton />
                  </StyledCell>
                  ))}
              </StyledRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        ActionsComponent={PaginationActions}
        colSpan={headers.length}
        rowsPerPageOptions={rowsPerPageOptions ?? defaultPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={perPage ?? ApiParams.PER_PAGE}
        page={page}
        onChangePage={(event: any, changedPage: number) => onChangePage ? onChangePage(changedPage + 1) : null}
        onChangeRowsPerPage={(event: any) => onChangeRowsPerPage ? onChangeRowsPerPage(event.target.value) : null}
        />
    </div>
  );
};

export default observer(DataTable);