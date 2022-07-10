import styled from 'styled-components';

const BlockContent = styled.div`
  margin: auto;
  width: 100%;
  margin-top: 0;
  font-size: 14px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  color: ${props => props.theme.colors.gray40};
`;

export default BlockContent;
