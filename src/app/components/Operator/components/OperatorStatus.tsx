import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import InfoTooltip from '~app/common/components/InfoTooltip';

const OperatorPerformanceContainer = styled.div`
  width: 312px;
  height: 158px;
  display: flex;
  margin-bottom: 25px;
  border-radius: 16px;
  flex-direction: column;
  padding: 32px 20px 46px 32px;
  background-color: ${props => props.theme.colors.white};
  @media (max-width: 576px) {
    width: 100%;
  },
`;

const DataHeader = styled.div`
  margin-top: 0;
  font-size: 20px;
  line-height: 1.4;
  text-align: left;
  font-weight: bold;
  font-style: normal;
  margin-bottom: auto;
  font-stretch: normal;
  color: ${props => props.theme.colors.gray40};
`;

const ValueContent = styled.div`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.24;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.5px;
  color: ${props => props.theme.colors.gray100};
`;

const OperatorStatus = ({ status, is_deleted }: { status: string, is_deleted?: boolean }) => {
    const headerTooltipStyle = { fontSize: '14px', color: 'rgb(161, 172, 190)', marginBottom: '-2px' };
    let textColor: string;
    let statusText: JSX.Element | string;

    if (is_deleted) {
        statusText = 'Deleted';
        textColor = '#ec1c26';
    } else {
        switch (status) {
            case 'Active':
                textColor = '#08c858';
                break;
            case 'Inactive':
                textColor = '#ec1c26';
                break;
            default:
                textColor = '#808080';
        }
        statusText = !status ? <Skeleton style={{ width: 100 }} /> : status;
    }

    return (
      <OperatorPerformanceContainer>
        <DataHeader>
          Status
          <InfoTooltip
            style={headerTooltipStyle}
            message="Is the operator performing duties for the majority of its validators in the last 2 epochs."
          />
        </DataHeader>
        <ValueContent style={{ color: textColor }}>{statusText}</ValueContent>
      </OperatorPerformanceContainer>
    );
};

export default observer(OperatorStatus);
