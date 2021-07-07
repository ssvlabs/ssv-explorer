import React from 'react';
import Link from '@material-ui/core/Link';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import ApplicationStore from '~app/common/stores/Application.store';
import { getBaseBeaconchaUrl, NETWORKS } from '~lib/utils/beaconcha';

type BeaconchaLinkProps = {
  width: number,
  height: number,
  address: string,
  network?: any
};

const BeaconchaLink = ({ width, height, address, network }: BeaconchaLinkProps) => {
  const classes = useStyles();
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;

  return (
    <Link
      href={`${getBaseBeaconchaUrl(network ?? NETWORKS.PRATER)}/${address}`}
      target="_blank"
      style={{ marginLeft: 15 }}
      className={classes.Link}
    >
      {!applicationStore.isDarkMode && <img width={width} height={height} src="/images/beaconcha.svg" alt="Beaconcha" />}
      {applicationStore.isDarkMode && <img width={width} height={height} src="/images/beaconcha-white.svg" alt="Beaconcha" />}
    </Link>
  );
};

export default BeaconchaLink;
