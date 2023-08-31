import React from 'react';
import Grid from '@material-ui/core/Grid';
import { getImage } from '~lib/utils/filePath';
import { useStyles } from '~app/common/components/MevRelaysBadge/MevRelaysBadge.styles';

const MevRelaysBadge = ({ label }: { label: string }) => {
    const classes = useStyles();
    const logo = label.toLowerCase().includes('bloxroute') ?
        getImage('mevs/bloxroute.svg') :
        getImage(`mevs/${label.trim().replaceAll(' ', '_').toLowerCase()}.svg`);

    return (
      <Grid className={classes.MevRelaysBadgeWrapper}>
        <img className={classes.MevIcon} src={logo} alt={label} />
        {label}
      </Grid>
    );
};

export default MevRelaysBadge;
