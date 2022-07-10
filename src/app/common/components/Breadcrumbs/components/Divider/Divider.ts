import styled from 'styled-components';

const BreadCrumbDivider = styled.div`
  color: #A1ACBE;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  &:before {
    content: ' > ';
  }
  display: inline;
`;

export default BreadCrumbDivider;
