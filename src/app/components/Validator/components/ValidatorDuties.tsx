import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DataTable from '~app/common/components/DataTable/DataTable';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { capitalize } from '~lib/utils/strings';
import { useStyles } from '~app/components/Styles';
import { ChipLink, FailureChip, SuccessChip } from '~app/common/components/Chips';
import { DEVELOPER_FLAGS, getLocalStorageFlagValue } from '~lib/utils/DeveloperHelper';

const PaddedGridItem = styled(Grid)<({ paddingLeft?: number })>`
  padding-left: ${({ paddingLeft }) => (paddingLeft || 0) > 0 ? `${paddingLeft}px` : 'initial'};

  @media (max-width: 960px) {
    padding-left: 0;
  }
`;

const useChipStyles = makeStyles(() => ({
  chip: {
    marginRight: 10,
    '& > .MuiChip-label': {
      display: 'inline-flex',
    },
  },
}));

type ValidatorDutiesProps = {
  validator: Record<string, any>;
};

export default (props: ValidatorDutiesProps) => {
  const { validator } = props;
  const classes = useStyles();
  const chipClasses = useChipStyles();
  const params: Record<string, any> = useParams();
  const defaultDuties: Record<string, any>[] | null = null;
  const [loadingDuties, setLoadingDuties] = useState(true);
  const [validatorDuties, setValidatorDuties] = useState(defaultDuties);
  const [dutiesPagination, setDutiesPagination] = useState(ApiParams.DEFAULT_PAGINATION);

  /**
   * When per page dropdown changed
   * @param perPage
   */
  const onChangeRowsPerPage = (perPage: number) => {
    ApiParams.saveInStorage('validator:duties', 'perPage', perPage);
    loadValidatorDuties(params.address, 1);
  };

  /**
   * Fetch all duties with pagination belonging to this validator
   * @param address
   * @param page
   */
  const loadValidatorDuties = (address: string, page: number) => {
    if (page) {
      ApiParams.saveInStorage('validator:duties', 'page', page);
    }
    const currentPage: number = ApiParams.getInteger('validator:duties', 'page', 1);
    const perPage: number = ApiParams.getInteger('validator:duties', 'perPage', ApiParams.PER_PAGE);
    setLoadingDuties(true);
    SsvNetwork.getInstance().fetchValidatorDuties(address, currentPage, perPage).then((result: any) => {
      if (result.status === 404) {
        // TODO
      } else {
        setValidatorDuties(result.data.duties);
        setDutiesPagination(result.data.pagination);
        setLoadingDuties(false);
      }
    });
  };

  const getGroupedOperators = (operators: any[]) => {
    const successOperators: any[] = [];
    const successOperatorsAddresses: any[] = [];
    const failedOperators: any[] = [];
    operators.map((operator: any) => {
      if (operator.status === 'success') {
        successOperators.push(operator);
        successOperatorsAddresses.push(operator.address);
      }
      return null;
    });
    (validator.operators ?? []).map((operator: any) => {
      if (successOperatorsAddresses.indexOf(operator.address) === -1) {
        failedOperators.push(operator);
      }
      return null;
    });
    return (
      <>
        {successOperators.length ? (
          <SuccessChip
            className={chipClasses.chip}
            label={successOperators.map((o, oi) => (
              <ChipLink
                key={`operators-success-${oi}`}
                className={classes.Link}
                href={`${config.routes.OPERATORS.HOME}/${o.address}`}
                style={{ maxWidth: 100 }}
              >
                <Typography noWrap style={{ fontSize: 14 }}>{o.name}</Typography>
              </ChipLink>
            ))
            }
            onDelete={() => {}}
            deleteIcon={<CheckCircleIcon />}
          />
        ) : ''}
        {failedOperators.length ? (
          <FailureChip
            className={chipClasses.chip}
            label={failedOperators.map((o, oi) => (
              <ChipLink
                key={`operators-failed-${oi}`}
                className={classes.Link}
                href={`${config.routes.OPERATORS.HOME}/${o.address}`}
                style={{ maxWidth: 100 }}
              >
                <Typography noWrap style={{ fontSize: 14 }}>{o.name}</Typography>
              </ChipLink>
            ))}
            onDelete={() => {}}
          />
        ) : ''}
      </>
    );
  };

  const renderSequenceNumber = (sequence: number) => {
    if (sequence === -1 || sequence === undefined) {
      return '';
    }
    if (getLocalStorageFlagValue(DEVELOPER_FLAGS.SHOW_SEQUENCE_NUMBERS) !== 1) {
      return '';
    }
    return (
      <div style={{ fontSize: 8, color: 'red' }}>SN: {sequence}</div>
    );
  };

  useEffect(() => {
    if (validatorDuties === null) {
      loadValidatorDuties(params.address, 1);
    }
  }, [loadingDuties, validator?.public_key]);

  return (
    <PaddedGridItem item xs={12} md={9} style={{ paddingLeft: 30 }}>
      <DataTable
        title="Duties"
        headers={['Epoch', 'Slot', 'Duty', 'Status', 'Operator Consensus Breakdown']}
        data={(validator?.public_key ? (validatorDuties ?? []) : []).map((duty: any) => {
          return [
            (<>{duty.epoch} {renderSequenceNumber(duty.sequence)}</>),
            duty.slot,
            capitalize(String(duty.duty).toLowerCase()),
            capitalize(duty.status ?? ''),
            getGroupedOperators(duty.operators),
          ];
        })}
        totalCount={dutiesPagination?.total || 0}
        page={(dutiesPagination?.page ?? 1) - 1}
        onChangePage={(page: number) => {
          loadValidatorDuties(params.address, page);
        }}
        onChangeRowsPerPage={onChangeRowsPerPage}
        perPage={ApiParams.getInteger('validator:duties', 'perPage', ApiParams.PER_PAGE)}
        isLoading={loadingDuties || !validator?.public_key}
      />
    </PaddedGridItem>
  );
};
