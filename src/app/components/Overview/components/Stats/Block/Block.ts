import styled from 'styled-components';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

const Block = styled.div`
  ${({ theme }) => `
  width: 424px;
    display: flex;
    height: 108px;
    min-height: 129px;
    border-radius: 16px;
    align-items: center;
    align-content: center;
    flex-direction: column;
    background-color: ${applicationStore.isDarkMode ? theme.palette.background.default : '#fff'};
       @media (max-width: 368px ) {
      width: 200px;
    }
        @media (max-width: 1329px) {
      width: 368px;
    },
  `}
`;

export default Block;
