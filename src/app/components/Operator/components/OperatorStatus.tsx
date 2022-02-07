import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import InfoTooltip from '~app/common/components/InfoTooltip';

const OperatorPerformanceContainer = styled.div`
  height: 164px;
  display: flex;
  border-radius: 6px;
  align-items: center;
  margin-bottom: 25px;
  justify-items: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  padding: 16px 20px 20px;
  border: solid 1px #5b6c84;
`;

const DataHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  width: 100%;
  text-align: left;
  margin-top: 0;
  margin-bottom: auto;
`;

const ValueContent = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  font-size: 28px;
  font-weight: 600;
  font-style: normal;
  text-align: center;
  line-height: normal;
  align-items: center;
  margin-bottom: auto;
  font-stretch: normal;
  align-content: center;
  justify-items: center;
  flex-direction: column;
  letter-spacing: normal;
  justify-content: center;
`;

const OperatorStatus = ({ status }: { status: string }) => {
    const headerTooltipStyle = { fontSize: '14px', color: 'rgb(161, 172, 190)', marginBottom: '-2px' };
    const textColor: string = status === 'Active' ? '#08c858' : '#ec1c26';

    return (
      <OperatorPerformanceContainer>
        <DataHeader>
          Status
          <InfoTooltip
            style={headerTooltipStyle}
            message="Operator technical scoring metric - calculated by the percentage of attended duties within a time-frame."
          />
        </DataHeader>
        <ValueContent style={{ color: textColor }}>
          {status}
        </ValueContent>
      </OperatorPerformanceContainer>
    );
};

export default observer(OperatorStatus);
