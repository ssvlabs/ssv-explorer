import React, { ChangeEvent } from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import chainService, { EChain } from '~lib/utils/ChainService';
import NetworkIcon from '~app/common/components/NetworkIcon';
import { useStyles } from './NeworkSelect.styles';
import { KeyboardArrowDown } from '@material-ui/icons';

const availableNetworks = [EChain.Ethereum, EChain.Hoodi];

const networkToConfigMap = {
  [EChain.Ethereum]: {
    url: 'https://explorer.ssv.network',
    label: 'Ethereum Mainnet',
    isTestnet: false,
  },
  [EChain.Hoodi]: {
    url: 'https://hoodi.explorer.ssv.network',
    label: 'Hoodi Testnet',
    isTestnet: true,
  },
};

export default function NetworkSelect() {
  const currentNetwork: EChain = chainService().getNetwork() as EChain;

  const classes = useStyles();

  const handleChange = (
    event: ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const urlToGo = networkToConfigMap[event.target.value as EChain].url;
    if (urlToGo) {
      window.open(urlToGo, '_self');
    }
  };

  return (
    <Box className={classes.Wrapper}>
      <Select
        variant="standard"
        autoWidth
        value={currentNetwork}
        onChange={handleChange}
        IconComponent={KeyboardArrowDown}
        className={classes.Root}
        classes={{
          select: classes.Select,
          icon: classes.Icon,
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: -16,
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.ItemListWrapper,
            list: classes.ItemList,
          },
        }}
      >
        {availableNetworks.map((net) => (
          <MenuItem value={net}>
            <div className={classes.ItemWrapper}>
              <NetworkIcon
                isTestnet={networkToConfigMap[net].isTestnet}
                network={net}
                className={classes.ItemIcon}
              />
              {networkToConfigMap[net].label}
            </div>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
