import styled from 'styled-components';

const BlockHeader = styled.div`
  width: 100%;
  margin: auto;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 0;
  padding-left: 10px;
  text-align: center;
  padding-right: 10px;
  color: ${props => props.theme.colors.primaryBlue};
`;

export default BlockHeader;
