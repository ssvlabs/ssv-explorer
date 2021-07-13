import styled from 'styled-components';

const BreadCrumbDivider = styled.div`
  font-family: 'Roboto-Regular', 'Roboto', sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 12px;
  color: #A1ACBE;
  &:before {
    content: ' / ';
  }
  display: inline;
`;

export default BreadCrumbDivider;
