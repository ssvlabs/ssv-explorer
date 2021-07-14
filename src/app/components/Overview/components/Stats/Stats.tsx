import React from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import config from '~app/common/config';
import { useStores } from '~app/hooks/useStores';
import { numberWithCommas } from '~lib/utils/numbers';
import OverviewStore from '~app/common/stores/Overview.store';
import StatsBlock from '~app/components/Overview/components/Stats/Block/Block';
import StatsContainer from '~app/components/Overview/components/Stats/Container/Container';
import StatsBlockHeader from '~app/components/Overview/components/Stats/BlockHeader/BlockHeader';
import StatsBlockContent from '~app/components/Overview/components/Stats/BlockContent/BlockContent';

const Stats = () => {
  const stores = useStores();
  const overviewStore: OverviewStore = stores.Overview;

  return (
    <StatsContainer>
      <StatsBlock>
        <StatsBlockHeader>
          {overviewStore.totalOperators === null && <Skeleton />}
          {overviewStore.totalOperators !== null ? numberWithCommas(overviewStore.totalOperators) : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {overviewStore.totalOperators === null ? <Skeleton /> : 'Operators'}
        </StatsBlockContent>
      </StatsBlock>
      <StatsBlock>
        <StatsBlockHeader>
          {overviewStore.totalValidators === null && <Skeleton />}
          {overviewStore.totalValidators !== null ? numberWithCommas(overviewStore.totalValidators) : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {overviewStore.totalValidators === null ? <Skeleton /> : 'Validators'}
        </StatsBlockContent>
      </StatsBlock>
      <StatsBlock>
        <StatsBlockHeader>
          {overviewStore.totalEth === null && <Skeleton />}
          {overviewStore.totalEth !== null ? `${numberWithCommas(overviewStore.totalEth)} ETH` : ''}
        </StatsBlockHeader>
        <StatsBlockContent>
          {config.FEATURE.NETWORK.NAME === 'mainnet' ? (
            <>
              {overviewStore.totalUsd === null && <Skeleton />}
              {overviewStore.totalUsd ? `$${numberWithCommas(overviewStore.totalUsd)}` : ''}
            </>
          ) : ''} Staked
        </StatsBlockContent>
      </StatsBlock>
    </StatsContainer>
  );
};

export default observer(Stats);
