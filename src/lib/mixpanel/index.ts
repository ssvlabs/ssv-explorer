import _mixpanel from 'mixpanel-browser';
import chainService from '~lib/utils/ChainService';

if (process.env.REACT_APP_MIXPANEL_TOKEN) {
  _mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
    ip: false,
  });
}

export const getSuperProperties = () => ({
  network: chainService().getNetwork(),
});

export const track: typeof _mixpanel.track = (event, properties) => {
  if (!process.env.REACT_APP_MIXPANEL_TOKEN) return;
  _mixpanel.track(event, {
    ...properties,
    ...getSuperProperties(),
  });
};

export const mixpanel = process.env.REACT_APP_MIXPANEL_TOKEN
  ? _mixpanel
  : {
      track: () => {},
      track_pageview: () => {},
      identify: () => {},
      reset: () => {},
    };
