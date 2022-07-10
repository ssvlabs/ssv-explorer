import styled from 'styled-components';

const BreadCrumb = styled.a`
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  text-decoration: none;
  color:  ${props => props.theme.colors.gray40};
`;

export default BreadCrumb;
