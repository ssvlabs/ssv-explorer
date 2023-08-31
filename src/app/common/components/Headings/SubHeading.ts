import { observer } from 'mobx-react';
import styled from 'styled-components';
import BaseStore from '~app/common/stores/BaseStore';
import ApplicationStore from '~app/common/stores/Application.store';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

const SubHeading = styled.div`
    ${() => {
        return `
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 140%;
          color: ${applicationStore.isDarkMode ? 'white' : '#5B6C84'};
          mix-blend-mode: normal;
          margin-top: -15px;
          display: flex;
          align-items: center;
          align-content: center;
        `;
    }}
`;

export default observer(SubHeading);
