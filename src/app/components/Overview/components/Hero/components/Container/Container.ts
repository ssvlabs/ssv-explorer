import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';

const Container = styled.div`
  height: 170px;
  min-height: 170px;
  background-color: #F2F2F2;
  width: 100%;
  border: 0;
  text-align: center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-bottom: 15px;

  @media (${mediaQueryDevices.tablet}) {
    height: 245px;
    min-height: 245px;
    padding-bottom: 0;
  }
`;

export default Container;
