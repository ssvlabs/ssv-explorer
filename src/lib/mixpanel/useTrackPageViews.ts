import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSuperProperties, mixpanel } from './index';

export const useTrackPageViews = () => {
  const location = useLocation();
  useEffect(() => {
    mixpanel.track_pageview(getSuperProperties());
  }, [location.pathname]);
};
