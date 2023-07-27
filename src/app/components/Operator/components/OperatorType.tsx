import React from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const OperatorTypes = {
  VERIFIED_OPERATOR: 'verified_operator',
  DAPP_NODE: 'dapp_node',
  OPERATOR: 'operator',
};

const OperatorTypeBadge = styled.div<({ operator_type: any })>`
  display: inline-flex;
  align-items: center;
  align-content: center;
  text-align: center;
  margin: auto;
  margin-left: 5px;
  border-radius: 4px;
  background-color: ${({ operator_type }) => {
    switch (operator_type) {
      case OperatorTypes.VERIFIED_OPERATOR:
        return 'rgb(201, 254, 244)';
      case OperatorTypes.DAPP_NODE:
        return 'rgba(94, 115, 234, 0.12)';
    }
  }};
  height: 28px;
  font-size: 14px;
  min-width: 90px;
  padding: 4px;
  color: #5B6C84;
  padding-left: 8px;
  padding-right: 6px;
  font-weight: 500;
  & > .operator-type-label {
    margin-right: 6px;
  }
  & > .MuiSvgIcon-root {
    font-size: 18px;
    margin-left: auto;
    margin-right: 0;
    color: ${({ operator_type }) => {
      switch (operator_type) {
        case OperatorTypes.VERIFIED_OPERATOR:
          return 'rgb(33, 215, 181);8';
        case OperatorTypes.DAPP_NODE:
          return '#0701FF';
      }
    }};
  }
`;

type OperatorTypeProps = {
  operator: any;
  style?: any;
};

const OperatorType = (props: OperatorTypeProps) => {
  const { operator, style } = props;
  if (!operator?.type) {
    return <></>;
  }

  const operatorTypeLabels: any = {
    [OperatorTypes.VERIFIED_OPERATOR]: 'Verified',
    [OperatorTypes.DAPP_NODE]: 'DAppNode',
  };

  return (
    <OperatorTypeBadge operator_type={operator.type} style={style || {}}>
      <div className="operator-type-label">{operatorTypeLabels[operator.type] ?? ''}</div>
      {operator?.type !== OperatorTypes.OPERATOR ? <CheckCircleIcon /> : ''}
    </OperatorTypeBadge>
  );
};

export default OperatorType;
