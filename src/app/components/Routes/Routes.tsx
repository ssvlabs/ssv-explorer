import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router-dom';
import config from '~app/common/config';
import Overview from '~app/components/Overview';
import PausedScreen from '~app/components/PausedScreen';
import Operator from '~app/components/Operator/Operator';
import OperatorsList from '~app/components/OperatorsList';
import Validator from '~app/components/Validator/Validator';
import ValidatorsList from '~app/components/ValidatorsList';
import MaintenancePage from '~app/components/Maintenance/MaintenancePage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={config.routes.PAUSED.HOME}>
        <PausedScreen />
      </Route>

      <Route exact path={config.routes.MAINTENANCE}>
        <MaintenancePage />
      </Route>

      <Route exact path={config.routes.HOME}>
        <Overview />
      </Route>

      <Route path={config.routes.OPERATORS.HOME}>
        <Switch>
          <Route exact path={config.routes.OPERATORS.HOME}>
            <OperatorsList />
          </Route>
          <Route path={config.routes.OPERATORS.OPERATOR}>
            <Operator />
          </Route>
        </Switch>
      </Route>

      <Route path={config.routes.VALIDATORS.HOME}>
        <Switch>
          <Route exact path={config.routes.VALIDATORS.HOME}>
            <ValidatorsList />
          </Route>
          <Route exact path={config.routes.VALIDATORS.VALIDATOR}>
            <Validator />
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
};

export default observer(Routes);
