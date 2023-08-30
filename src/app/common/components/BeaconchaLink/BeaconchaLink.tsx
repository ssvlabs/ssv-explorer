import React from 'react';
import Link from '@material-ui/core/Link';
import { useStores } from '~app/hooks/useStores';
import { useStyles } from '~app/components/Styles';
import { getBaseBeaconchaUrl } from '~lib/utils/beaconcha';
import ApplicationStore from '~app/common/stores/Application.store';

type BeaconchaLinkProps = {
  width: number,
  height: number,
  address: string,
};

const BeaconchaLink = ({ width, height, address }: BeaconchaLinkProps) => {
  const classes = useStyles({});
  const stores = useStores();
  const applicationStore: ApplicationStore = stores.Application;
  const imgSrc = `/images/beaconcha${applicationStore.isDarkMode ? '-white' : '-dark'}.svg`;

  return (
    <Link
      href={`${getBaseBeaconchaUrl()}/${address}`}
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
