import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { useStores } from '~app/hooks/useStores';
import ApplicationStore from '~app/common/stores/Application.store';

const DarkModeButton = styled(IconButton)`
  cursor: pointer;
  &:hover: {
    background-color: red;
  },
`;

const DarkModeSwitcher = ({ style }: { style?: any }) => {
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;

  return (
    <DarkModeButton onClick={() => applicationStore.switchDarkMode()} aria-label="Switch Dark/Light Mode" style={style ?? {}}>
      {!applicationStore.isDarkMode && <img width={34} height={28} src="/images/toggle/light.svg" alt="Copy" /> }
      {applicationStore.isDarkMode && <img width={34} height={28} src="/images/toggle/dark.svg" alt="Copy" /> }
    </DarkModeButton>
  );
};

export default observer(DarkModeSwitcher);
