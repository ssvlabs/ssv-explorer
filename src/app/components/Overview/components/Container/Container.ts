import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { mediaQueryDevices } from '~app/components/Styles';
import Paper from '~app/components/Overview/components/Paper';
import Column from '~app/components/Overview/components/Column';

const Container = styled(Grid)`
  display: flex;
  flex-direction: row;

  @media (${mediaQueryDevices.tablet}) {
    margin-top: 15px;
  }

  @media (${mediaQueryDevices.laptopM}) {
    & > ${Column} > ${Paper} {
      margin-left: auto;
      margin-right: auto;
      max-width: 600px;
    }

    & > ${Column}:first-child > ${Paper} {
      margin-left: auto;
      margin-right: 15px;
    }

    & > ${Column}:last-child > ${Paper} {
      margin-right: auto;
      margin-left: 15px;
    }
  }
`;

export default Container;
