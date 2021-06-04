import React from 'react';
import Link from '@material-ui/core/Link';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import ApplicationStore from '~app/common/stores/Application.store';

type BeaconchaLinkProps = {
  width: number,
  height: number,
  address: string
};

const BeaconchaLink = ({ width, height, address }: BeaconchaLinkProps) => {
  // TODO: make pyrmont/mainnet conditional
  const classes = useStyles();
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;

  return (
    <Link
      href={`https://pyrmont.beaconcha.in/${address}`}
      target="_blank"
      style={{ marginLeft: 15 }}
      className={classes.Link}
    >
      {!applicationStore.isDarkMode && <img width={width} height={height} src="/images/beaconcha.png" alt="Beaconcha" />}
      {applicationStore.isDarkMode && <img width={width} height={height} src="/images/beaconcha-white.png" alt="Beaconcha" />}
    </Link>
  );
};

export default BeaconchaLink;
