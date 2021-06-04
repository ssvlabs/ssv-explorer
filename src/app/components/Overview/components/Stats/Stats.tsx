import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import SsvNetwork from '~lib/api/SsvNetwork';
import StatsBlock from '~app/components/Overview/components/Stats/Block/Block';
import StatsContainer from '~app/components/Overview/components/Stats/Container/Container';
import StatsBlockHeader from '~app/components/Overview/components/Stats/BlockHeader/BlockHeader';
import StatsBlockContent from '~app/components/Overview/components/Stats/BlockContent/BlockContent';
import { numberWithCommas } from '~lib/utils/numbers';

const defaultStats = {
  operatorsCount: 0,
  validatorsCount: 0,
  totalEth: 0,
  totalUsd: 0,
};

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    if (loading) {
      SsvNetwork.getInstance().fetchStats().then((overview: any) => {
        setTimeout(() => {
          setStats(overview);
          setLoading(false);
        }, 2000);
      });
    }
  });

  return (
    <StatsContainer>
      <StatsBlock>
        <StatsBlockHeader>
          {loading && <Skeleton />}
          {!loading ? numberWithCommas(stats.operatorsCount) : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {loading ? <Skeleton /> : 'Operators'}
        </StatsBlockContent>
      </StatsBlock>
      <StatsBlock>
        <StatsBlockHeader>
          {loading && <Skeleton />}
          {!loading ? numberWithCommas(stats.validatorsCount) : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {loading ? <Skeleton /> : 'Validators'}
        </StatsBlockContent>
      </StatsBlock>
      <StatsBlock>
        <StatsBlockHeader>
          {loading && <Skeleton />}
          {!loading ? `${numberWithCommas(stats.totalEth)} ETH` : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {loading && <Skeleton />}
          {!loading ? `$${numberWithCommas(stats.totalUsd)} Staked` : ''}
        </StatsBlockContent>
      </StatsBlock>
    </StatsContainer>
  );
};

export default observer(Stats);
