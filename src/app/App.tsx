import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Routes from '~app/components/Routes';
import { useStores } from '~app/hooks/useStores';
import AppBar from '~app/common/components/AppBar';
import DeveloperHelper from '~lib/utils/DeveloperHelper';
import ApplicationStore from '~app/common/stores/Application.store';
import { useLocation } from 'react-router-dom';

const App = () => {
  const stores = useStores();
  const location = useLocation();
  const applicationStore: ApplicationStore = stores.Application;
  const whiteBackgroundColor = location.pathname.includes('/operators/') || location.pathname.includes('/validators/');

  return (
    <MuiThemeProvider theme={applicationStore.muiTheme}>
      <ThemeProvider theme={applicationStore.muiTheme}>
        <DeveloperHelper />
        <AppBar whiteBackgroundColor={whiteBackgroundColor} />
        <Routes />
        <CssBaseline />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default observer(App);
