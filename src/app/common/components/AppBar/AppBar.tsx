import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge, Box, Divider, Link } from '@material-ui/core';
import config from '~app/common/config';
import { useStyles } from './AppBar.styles';

const DrawerButtonsContainers = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  width: 100%;
`;

const DrawerButton = styled(Link)`
  margin-top: 10px;
`;

const AppBarComponent = () => {
  const classes = useStyles();
  const [isDrawerOpened, toggleDrawer] = useState(false);
  const joinSsvLink = 'https://app.testnet.ssv.network'; // TODO: move to env -> config

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <b>ssv.network</b> explorer
          </Typography>

          <Box className={classes.toolbarLinks} component="div" display={{ xs: 'none', sm: 'none', md: 'block' }}>
            <Link href={config.routes.HOME} className={classes.appBarLink}>Overview</Link>
            <Link href={config.routes.OPERATORS.HOME} className={classes.appBarLink}>Operators</Link>
            <Link href={config.routes.VALIDATORS.HOME} className={classes.appBarLink}>Validators</Link>
          </Box>

          <Box className={classes.toolbarButtons} component="div" display={{ xs: 'none', sm: 'none', md: 'block' }}>
            <Link href={joinSsvLink} target="_blank">
              <Button variant="outlined" className={classes.appBarLink}>Join SSV Network</Button>
            </Link>
            <Badge variant="dot" color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left' }} className={classes.buttonBadge}>
              <Button variant="outlined" className={classes.appBarLink} color="primary">Pyrmont Network</Button>
            </Badge>
          </Box>

          <Box className={classes.menuButton} component="div" display={{ xs: 'block', sm: 'block', md: 'none' }}>
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              className={classes.drawer}
              anchor="right"
              open={isDrawerOpened}
              onClose={() => toggleDrawer(false)}
            >
              <List>
                <ListItem button disabled>
                  <ListItemText primary="Menu" style={{ textAlign: 'center' }} />
                </ListItem>
                <Divider />

                <Link href={config.routes.HOME}>
                  <ListItem button>
                    <ListItemText primary="Overview" />
                  </ListItem>
                </Link>
                <Divider />

                <Link href={config.routes.OPERATORS.HOME}>
                  <ListItem button>
                    <ListItemText primary="Operators" />
                  </ListItem>
                </Link>
                <Divider />

                <Link href={config.routes.VALIDATORS.HOME}>
                  <ListItem button>
                    <ListItemText primary="Validators" />
                  </ListItem>
                </Link>
                <Divider />

                <DrawerButtonsContainers>
                  <DrawerButton href={joinSsvLink} target="_blank">
                    <Badge className={classes.buttonBadge}>
                      <Button variant="outlined" color="primary" className={classes.buttonBadge}>Join SSV Network</Button>
                    </Badge>
                  </DrawerButton>
                  <DrawerButton>
                    <Badge variant="dot" color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left' }} className={classes.buttonBadge}>
                      <Button variant="outlined" color="primary">Pyrmont Network</Button>
                    </Badge>
                  </DrawerButton>
                </DrawerButtonsContainers>
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default observer(AppBarComponent);
