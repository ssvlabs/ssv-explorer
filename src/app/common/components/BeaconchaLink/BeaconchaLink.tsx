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
  const imgSrc = `/images/beaconcha${applicationStore.isDarkMode ? '-white' : ''}-new.svg`;

  return (
    <Link
      href={`${getBaseBeaconchaUrl(network ?? NETWORKS.PRATER)}/${address}`}
      target="_blank"
      style={{ marginLeft: 15 }}
      className={classes.Link}
    >
      <img
        width={width}
        height={height}
        src={imgSrc}
        alt="Beaconcha"
      />
    </Link>
  );
};

export default BeaconchaLink;
