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
import ErrorBoundary from '~app/components/ErrorBoundary';
import SimpleAppBar from '~app/common/components/AppBar/SimpleAppBar';
import { useHistory } from 'react-router-dom';
import config from '~app/common/config';
import { useTrackPageViews } from '~lib/mixpanel/useTrackPageViews';

const App = () => {
  const stores = useStores();
  const history = useHistory();
  const applicationStore: ApplicationStore = stores.Application;

  if (applicationStore.isMaintenancePage) {
    history.push(config.routes.MAINTENANCE);
  }
  
  useTrackPageViews();

  return (
    <ErrorBoundary>
      <MuiThemeProvider theme={applicationStore.muiTheme}>
        <ThemeProvider theme={applicationStore.muiTheme}>
          <DeveloperHelper />
          <Announcement />
          {applicationStore.isMaintenancePage ? <SimpleAppBar /> : <AppBar />}
          <Routes />
          <CssBaseline />
        </ThemeProvider>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
};

export default observer(App);
