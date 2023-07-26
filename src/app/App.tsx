import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Routes from '~app/components/Routes';
import { useStores } from '~app/hooks/useStores';
import AppBar from '~app/common/components/AppBar';
import DeveloperHelper from '~lib/utils/DeveloperHelper';
import Announcement from '~app/common/components/Announcement';
import ApplicationStore from '~app/common/stores/Application.store';

const App = () => {
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;

  return (
    <MuiThemeProvider theme={applicationStore.muiTheme}>
      <ThemeProvider theme={applicationStore.muiTheme}>
        <DeveloperHelper />
        <Announcement />
        <AppBar />
        <Routes />
        <CssBaseline />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default observer(App);
