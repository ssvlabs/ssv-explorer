import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStores } from '~app/hooks/useStores';
import { numberWithCommas } from '~lib/utils/numbers';
import OverviewStore from '~app/common/stores/Overview.store';
import { useStyles } from '~app/components/Overview/components/Stats/Stats.styles';

const Stats = () => {
    const stores = useStores();
    const classes = useStyles({});
    const overviewStore: OverviewStore = stores.Overview;

    return (
      <Grid md={10} sm={10} xs={12} lg={12} className={classes.StatsContainer}>
        <Grid xs={12} sm={5} md lg className={classes.StatsBlock}>
          <Grid className={classes.BlockHeader}>
            {overviewStore.totalOperators === null && <Skeleton />}
            {overviewStore.totalOperators !== null ? numberWithCommas(overviewStore.totalOperators) : ''}
          </Grid>
          <Grid className={classes.StatsBlockContent}>
            {overviewStore.totalOperators === null ? <Skeleton /> : 'Operators'}
          </Grid>
        </Grid>
        <Grid xs={12} sm={5} md lg className={classes.StatsBlock}>
          <Grid className={classes.BlockHeader}>
            {overviewStore.totalValidators === null && <Skeleton />}
            {overviewStore.totalValidators !== null ? numberWithCommas(overviewStore.totalValidators) : ''}
          </Grid>
          <Grid className={classes.StatsBlockContent}>
            {overviewStore.totalValidators === null ? <Skeleton /> : 'Validators'}
          </Grid>
        </Grid>
        <Grid xs={12} sm={5} md lg className={classes.StatsBlock}>
          <Grid className={classes.BlockHeader}>
            {overviewStore.totalEth === null && <Skeleton />}
            {overviewStore.totalEth !== null ? `${numberWithCommas(overviewStore.totalEth)} ETH` : ''}
          </Grid>
          <Grid className={classes.StatsBlockContent}>
            {SsvNetwork.getActiveNetwork() === 'mainnet' ? (
              <>
                {overviewStore.totalUsd === null && <Skeleton />}
                {overviewStore.totalUsd ? `$${numberWithCommas(overviewStore.totalUsd)}` : ''}
              </>
                    ) : ''} Staked
          </Grid>
        </Grid>
      </Grid>
    );
};

export default observer(Stats);
