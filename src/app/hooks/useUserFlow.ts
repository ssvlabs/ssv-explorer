import _ from 'underscore';
import { useHistory, useRouteMatch } from 'react-router-dom';
import config from '~app/common/config';
// import { useStores } from '~app/hooks/useStores';

export type IUserFlow = {
  name: string,
  route: string | string[],
  depends?: IUserFlow[],
  condition?: () => boolean,
};

const { routes } = config;

const welcomeFlow: IUserFlow = {
  name: 'Welcome',
  route: routes.HOME,
};

const userFlows: IUserFlow[] = [
  welcomeFlow,
];

const dispatchUserFlow = (
  flows: IUserFlow[],
  currentPath: string,
  isDependency: boolean = false,
): IUserFlow | null => {
  for (let i = 0; i < flows.length; i += 1) {
    const flow = flows[i];
    const routeMatched = _.isArray(flow.route)
      ? flow.route.indexOf(currentPath) !== -1
      : currentPath === flow.route;

    if (isDependency || routeMatched) {
      if (typeof flow.condition === 'function') {
        const condition = flow.condition();
        if (!condition) {
          if (flow.depends?.length) {
            const requiredFlow = dispatchUserFlow(flow.depends, currentPath, true);
            return requiredFlow ?? flow;
          }
          return flow;
        }
      } else if (flow.depends?.length) {
        return dispatchUserFlow(flow.depends, currentPath, true);
      } else {
        return flow;
      }
    }
  }
  return null;
};

const setUserFlow = (userFlow: string) => {
  localStorage.setItem('userFlow', userFlow);
};

const getUserFlow = () => {
  return localStorage.getItem('userFlow');
};

const useUserFlow = () => {
  const history = useHistory();
  const currentRoute = useRouteMatch();
  const requiredFlow = dispatchUserFlow(userFlows, currentRoute.path);
  let redirectUrl;
  if (requiredFlow) {
    redirectUrl = _.isArray(requiredFlow.route)
      ? requiredFlow.route[0]
      : requiredFlow.route;
  }

  return {
    setUserFlow,
    getUserFlow,
    routes,
    history,
    path: currentRoute.path,
    flows: userFlows,
    requiredFlow,
    redirectUrl,
  };
};

export default useUserFlow;
