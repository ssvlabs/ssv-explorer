import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { mediaQueryDevices } from '~app/components/Styles';

const SearchInput = styled(TextField)`
  width: 400px;
  margin: auto;
  margin-top: 0;
  height: 40px;
  max-height: 40px;
  padding-left: 0;
  padding-right: 5px!important;
  
  @media (max-width: 767px) {
    width: 100%;
  }
  
  @media (${mediaQueryDevices.tablet}) {
    width: 400px;
  }
  
  & > .MuiInputBase-root {
    padding-right: 13px!important;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export default SearchInput;
