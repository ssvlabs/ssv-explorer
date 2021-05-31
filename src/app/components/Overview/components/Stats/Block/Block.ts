import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';

const Block = styled.div`
  height: 98px;
  min-height: 98px;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(242, 242, 242, 1);
  margin: auto;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

  @media (${mediaQueryDevices.tablet}) {
    margin-right: 30px;
    margin-left: 30px;
    width: 200px;
    min-width: 200px;
    margin-top: auto;
    
    &:nth-child(1) {
      margin-left: auto;
    }

    &:last-child {
      margin-right: auto;
    }
  }
`;

export default Block;