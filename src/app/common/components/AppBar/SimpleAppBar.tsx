import React from 'react';
import styled from 'styled-components';
import DarkModeSwitcher from '~app/common/components/DarkModeSwitcher/DarkModeSwitcher';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Application.store';

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AppBarLogo = styled.div<{ path: string }>`
  height: 40px;
  width: 133px;
  cursor: default;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${({ path }) => `url(${path})`};
`;

const SimpleAppBar = () => {
    const stores = useStores();
    const applicationStore: ApplicationStore = stores.Application;
    return (
      <Wrapper>
        <AppBarLogo path={`/images/website_logo_${applicationStore.isDarkMode ? 'light' : 'dark'}.svg`} />
        <DarkModeSwitcher style={{ marginLeft: 'auto', marginRight: 0, minWidth: 'auto', width: 70 }} />
      </Wrapper>
    );
};

export default SimpleAppBar;
