import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { mediaQueryDevices } from '~app/components/Styles';

const SearchInput = styled(TextField)`
  & > .MuiInputBase-root {
    padding: 0;
    height: 60px;
    width: 1320px;
    border-radius: 8px;
    border: none;
    background-color: #fdfefe;
    //padding-right: 13px!important;
    @media (max-width: 1329px) {
      width: 1152px;
    },
  &.MuiInput-underline:hover:not(.Mui-disabled):before {
    border: none;
    transition: none;
  }
  &:before {
    border: none;
  }
  }

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (${mediaQueryDevices.tablet}) {
    //width: 400px;
  }

  //& > .MuiInputBase-root {
  //  padding-right: 13px!important;
  //  padding-top: 0;
  //  padding-bottom: 0;
  //}
`;

export default SearchInput;
