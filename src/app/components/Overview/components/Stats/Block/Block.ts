import styled from 'styled-components';
import { mediaQueryDevices } from '~app/components/Styles';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

const Block = styled.div`
  ${({ theme }) => `
    height: 108px;
    min-height: 108px;
    width: 100%;
    background-color: ${applicationStore.isDarkMode ? theme.palette.background.default : '#fff'};
    border-radius: 5px;
    margin: auto;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    box-shadow: 0px 5px 13px rgba(91, 108, 132, 0.16);
    border-radius: 6px;
  
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
  `}
`;

export default Block;
