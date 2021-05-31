import styled from 'styled-components';

const BreadCrumbDivider = styled.div`
  font-family: 'Roboto-Regular', 'Roboto', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  color: #7F7F7F;
  &:before {
    content: ' / ';
  }
  display: inline;
`;

export default BreadCrumbDivider;
