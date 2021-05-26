import React from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from '~app/components/Routes';
import AppBar from '~app/common/components/AppBar';

const App = () => {
  return (
    <ThemeProvider theme={{}}>
      <AppBar />
      <Routes />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default observer(App);
