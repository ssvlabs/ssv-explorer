import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import InfoTooltip from '~app/common/components/InfoTooltip';
import { OperatorProps } from '~app/components/Operator/components/OperatorProps';

const OperatorPerformanceContainer = styled.div`
  width: 312px;
  display: flex;
  height: 158px;
  border-radius: 16px;
  margin-bottom: 25px;
  flex-direction: column;
  padding: 32px 27px 44px 32px;
  background-color: ${props => props.theme.colors.white};
  @media (min-width: 993px) and (max-width: 1200px) {
    width: 348px;
  }
  @media (max-width: 992px) {
    width: 312px;
  }
  @media (max-width: 576px) {
    width: 100%;
  },
`;

const PerformanceDataHeader = styled.div`
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

const PerformanceBox = styled.div`
  width: 32px;
  height: 32px;
  font-size: 16px;
  cursor: pointer;
  line-height: 1.25;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  border-radius: 4px;
  font-stretch: normal;
  letter-spacing: normal;
  padding: 5px 5px 5px 5px;
  color: ${props => {
    // @ts-ignore
      return props.selected ? props.theme.colors.primaryBlue : props.theme.colors.gray40;
  }};
  border: solid 1px ${props => {
    // @ts-ignore
    return props.selected ? props.theme.colors.primaryBlue : props.theme.colors.gray40;
  }};
`;

const PerformanceValueContent = styled.div`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.24;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.5px;
  color: ${props => props.theme.colors.gray100};
`;

function getPerformance(operator: any, selectedPerformance: string): any {
  const performanceKey = `${operator?.address}_${selectedPerformance}`;

  // @ts-ignore
  if (!((operator?.performance !== undefined && operator?.performance[selectedPerformance] !== undefined) || getPerformance[performanceKey])) {
    return [false, <Skeleton style={{ width: 100 }} />];
  }

  // @ts-ignore
  if (getPerformance[performanceKey]) {
    // @ts-ignore
    return [true, getPerformance[performanceKey]];
  }
  const performance = `${parseFloat(String(operator?.performance[selectedPerformance])).toFixed(2)}%`;
  // @ts-ignore
  getPerformance[performanceKey] = performance;
  return [true, performance];
}

const OperatorPerformanceWidget = (props: OperatorProps) => {
  const supportedPerformances: any = { '24h': '1D', '30d': '1M' };
  const [selectedPerformance, setSelectedPerformance] = useState('24h');
  const headerTooltipStyle = { fontSize: '14px', color: 'rgb(161, 172, 190)', marginBottom: '-2px' };

  return (
    <OperatorPerformanceContainer>
      <PerformanceDataHeader>
        Performance
        <InfoTooltip
          style={headerTooltipStyle}
          message="Operator technical scoring metric - calculated by the percentage of attended duties within a time-frame."
        />
        <Grid container style={{ gap: 8, justifyContent: 'right', float: 'right', width: 100 }}>
          {Object.keys(supportedPerformances).map((performance: any) => {
            return (
              <PerformanceBox
                // @ts-ignore
                selected={selectedPerformance === performance}
                key={`performance-${performance}`}
                onKeyDown={() => {}}
                onKeyUp={() => {}}
                onClick={() => {
                  setSelectedPerformance(performance);
                }}
              >
                {supportedPerformances[performance]}
              </PerformanceBox>
            );
          })}
        </Grid>
      </PerformanceDataHeader>
      <PerformanceValueContent>
        {getPerformance(props.operator, selectedPerformance)[1]}
      </PerformanceValueContent>
    </OperatorPerformanceContainer>
  );
};

const OperatorPerformance = (props: OperatorProps) => {
  return <OperatorPerformanceWidget {...props} />;
};

export default observer(OperatorPerformance);
