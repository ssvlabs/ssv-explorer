import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import ApiParams from '~lib/api/ApiParams';
import SsvNetwork from '~lib/api/SsvNetwork';
import { capitalize } from '~lib/utils/strings';
import { useStyles } from '~app/components/Styles';
import DataTable from '~app/common/components/DataTable/DataTable';
import { DEVELOPER_FLAGS, getLocalStorageFlagValue } from '~lib/utils/DeveloperHelper';
import OperatorConsensusSlot from '~app/components/Validator/components/OperatorConsensusSlot/OperatorConsensusSlot';

const PaddedGridItem = styled(Grid)<({ paddingLeft?: number })>`
  padding-left: ${({ paddingLeft }) => (paddingLeft || 0) > 0 ? `${paddingLeft}px` : 'initial'};

  @media (max-width: 960px) {
    padding-left: 0;
  }
`;

type ValidatorDutiesProps = {
  validator: Record<string, any>;
};

export default (props: ValidatorDutiesProps) => {
  const { validator } = props;
  const classes = useStyles({});
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

  const getRenderedSigners = (operators: any[], missingOperators: any[]) => {
    const operatorList = [...operators, ...missingOperators];
    return (
      <>
        <Grid className={classes.OperatorConsensusWrapper}>
          {operatorList.map((operator: any, index: number) => (
            <OperatorConsensusSlot
              key={operator.id}
              status={operator.status}
              operatorId={operator.id}
              isNotFirst={index !== 0}
              operatorName={operator.name}
              isNotLast={index !== operatorList.length - 1} />
          ))}
        </Grid>
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
    <Grid className={classes.ValidatorDutiesWrapper} xs={12} sm={12} md={12} lg={7} xl={7}>
      <PaddedGridItem item>
        <Grid className={classes.ValidatorTableHeaderWrapper}>
          <h3 style={{ color: '#97a5ba', fontSize: 20 }}>
            Duties
          </h3>
        </Grid>
        <DataTable
          noDataMessage={'This validator has not performed any duties on the SSV network yet'}
          headers={['Epoch', 'Slot', 'Duty', 'Status', 'Operator Consensus Breakdown']}
          data={(validator?.public_key ? (validatorDuties ?? []) : []).map((duty: any) => {
          return [
            (<>{duty.epoch} {renderSequenceNumber(duty.sequence)}</>),
            duty.slot,
            capitalize(String(duty.duty).toLowerCase()),
            capitalize(duty.status ?? ''),
            getRenderedSigners(duty.operators, duty.missing_operators),
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
    </Grid>
  );
};
