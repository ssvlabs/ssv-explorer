import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';

const Container = styled.div`
  ${() => `
    height: 200px;
    min-height: 200px;
    background-color: rgba(201, 254, 244, 0.3);
    border: 0;
    width: 100%;
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
  `}
`;

export default Container;
