import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;

  @media (${mediaQueryDevices.mobileS}) {
    flex-direction: column;
  }

  @media (${mediaQueryDevices.tablet}) {
    flex-direction: row;
    margin-top: -50px;
  }
`;

export default Container;
