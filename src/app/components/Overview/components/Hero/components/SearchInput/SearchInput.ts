import styled from 'styled-components';
import { OutlinedInput } from '@material-ui/core';
import { mediaQueryDevices } from '~app/components/Styles';

const SearchInput = styled(OutlinedInput)`
  margin: auto;
  margin-top: 0;
  width: 90%;
  height: 40px;
  padding-left: 0;
  @media (${mediaQueryDevices.tablet}) {
    width: 500px;
  }
`;

export default SearchInput;
