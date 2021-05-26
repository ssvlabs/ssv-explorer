import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import config from '~app/common/config';
import Welcome from '~app/components/Welcome';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={config.routes.HOME}>
        <Welcome />
      </Route>

      <Route path={config.routes.OPERATORS.HOME}>
        <Switch>
          <Route exact path={config.routes.OPERATORS.HOME}>
            Operators Home
          </Route>
        </Switch>
      </Route>

      <Route path={config.routes.VALIDATORS.HOME}>
        <Switch>
          <Route exact path={config.routes.VALIDATORS.HOME}>
            Validators Home
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
};

export default observer(Routes);
