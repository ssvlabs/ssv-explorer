import React from 'react';
import Grid from '@material-ui/core/Grid';
import { getImage } from '~lib/utils/filePath';
import { useStyles } from '~app/common/components/MevRelaysBadge/MevRelaysBadge.styles';

const MEVS = {
    AESTUS: 'Aestus',
    AGNOSTIC: 'Agnostic Gnosis',
    BLOCKNATIVE: 'Blocknative',
    BLOX_ROUTE: 'bloXroute Ethical',
    BLOX_ROUTE_MAX: 'bloXroute Max Profit',
    BLOX_ROUTE_REG: 'bloXroute Regulated',
    EDEN_NETWORK: 'Eden Network',
    FLASHBOTS: 'Flashbots',
    TITAN: 'Titan Relay',
    MANIFOLD: 'Manifold',
    ULTRA_SOUND: 'Ultra Sound',
};

const mevIcons: Record<string, string> = {
    [MEVS.AESTUS]: 'aestus',
    [MEVS.AGNOSTIC]: 'agnostic_gnosis',
    [MEVS.BLOCKNATIVE]: 'blocknative',
    [MEVS.BLOX_ROUTE]: 'bloxroute',
    [MEVS.BLOX_ROUTE_MAX]: 'bloxroute',
    [MEVS.BLOX_ROUTE_REG]: 'bloxroute',
    [MEVS.EDEN_NETWORK]: 'eden_network',
    [MEVS.TITAN]: 'titan',
    [MEVS.FLASHBOTS]: 'flashbots',
    [MEVS.MANIFOLD]: 'manifold',
    [MEVS.ULTRA_SOUND]: 'ultra_sound',
};

const MevRelaysBadge = ({ label, darkMode }: { label: string, darkMode: boolean }) => {
    const classes = useStyles();
    const logo = getImage(`mevs/${mevIcons[label]}${darkMode ? '-dark' : ''}.svg`);

    return (
      <Grid className={classes.MevRelaysBadgeWrapper}>
        <img className={classes.MevIcon} src={logo} alt={label} />
        {label}
      </Grid>
    );
};

export default MevRelaysBadge;
