import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { mediaQueryDevices } from '~app/components/Styles';

const SearchInput = styled(TextField)`
  & > .MuiInputBase-root {
    padding: 0;
    height: 60px;
    border-radius: 8px;
    border: none;
    background-color: #fdfefe;
  &.MuiInput-underline:hover:not(.Mui-disabled):before {
    border: none;
    transition: none;
  }
  &:before {
    border: none;
  }
  }

  @media (${mediaQueryDevices.tablet}) {
  }
`;

export default SearchInput;
