import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';

const Container = styled.div`
  ${() => `
    border: 0;
    width: 100%;
    flex-grow: 1;
    display: flex;
    height: 200px;
    min-height: 200px;
    text-align: center;
    padding-bottom: 15px;
    align-content: center;
    flex-direction: column;
  
    @media (${mediaQueryDevices.tablet}) {
      height: 245px;
      min-height: 245px;
      padding-bottom: 0;
    }
  `}
`;

export default Container;
