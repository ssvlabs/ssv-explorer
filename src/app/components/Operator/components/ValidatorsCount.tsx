import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const ValidatorCountContainer = styled.div`
  width: 312px;
  height: 158px;
  display: flex;
  margin-bottom: 25px;
  border-radius: 16px;
  flex-direction: column;
  padding: 32px 20px 41px 32px;
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

const ValidatorCount = ({ validatorCount }: { validatorCount: number }) => {
    return (
      <ValidatorCountContainer>
        <DataHeader>
          Validators
        </DataHeader>
        <ValueContent>{validatorCount}</ValueContent>
      </ValidatorCountContainer>
    );
};

export default observer(ValidatorCount);
