import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';

const Container = styled.div`
  display: flex;
  gap: 24px;
  min-height: 100px;

  @media (${mediaQueryDevices.mobileS}) {
    flex-direction: column;
  }

  @media (${mediaQueryDevices.tablet}) {
    flex-direction: row;
    margin-top: -50px;
  }
`;

export default Container;
