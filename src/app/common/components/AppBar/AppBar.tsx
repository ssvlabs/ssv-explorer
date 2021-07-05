import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Box, Divider, Link } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { useStyles } from './AppBar.styles';
import { useStyles as useAppStyles } from '~app/components/Styles';
import DarkModeSwitcher from '~app/common/components/DarkModeSwitcher';

const DrawerButtonsContainers = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  width: 100%;
`;

const DrawerButton = styled(Link)`
  width: 100%;
  margin: auto;
  margin-top: 10px;
`;

const AppBarComponent = () => {
  const classes = useStyles();
  const appClasses = useAppStyles();
  const [isDrawerOpened, toggleDrawer] = useState(false);
  const joinSsvLink = config.links.LINK_SSV_WEBAPP;

  const isRouteActive = (routeLink: string, returnValue: any, exact: boolean = false) => {
    const location = useLocation();
    if (exact) {
      return routeLink === location.pathname ? returnValue : '';
    }
    return location.pathname.startsWith(routeLink) ? returnValue : '';
  };

  const isOverviewPage = () => {
    const location = useLocation();
    return location.pathname === '/';
  };

  const clearPaginationMemory = () => {
    ApiParams.initStorage(true);
  };

  return (
    <div className={classes.root} id="back-to-top-anchor">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href={config.routes.HOME} style={{ color: 'white' }}>
              <b>ssv.network</b> explorer
            </Link>
          </Typography>

          <Box className={classes.toolbarLinks} component="div" display={{ xs: 'none', sm: 'none', md: 'block' }}>
            <Link
              href={config.routes.HOME}
              className={`${classes.appBarLink} ${isRouteActive(config.routes.HOME, classes.appBarLinkActive, true)}`}
            >
              Overview
            </Link>
            <Link
              href={config.routes.OPERATORS.HOME}
              className={`${classes.appBarLink} ${isRouteActive(config.routes.OPERATORS.HOME, classes.appBarLinkActive)}`}
              onClick={() => clearPaginationMemory()}
            >
              Operators
            </Link>
            <Link
              href={config.routes.VALIDATORS.HOME}
              className={`${classes.appBarLink} ${isRouteActive(config.routes.VALIDATORS.HOME, classes.appBarLinkActive)}`}
              onClick={() => clearPaginationMemory()}
            >
              Validators
            </Link>
          </Box>

          <Box className={classes.toolbarButtons} component="div" display={{ xs: 'none', sm: 'none', md: 'block' }}>
            <Link href={joinSsvLink} target="_blank">
              <Button variant="outlined" className={`${classes.appBarButton} ${classes.appBarButtonWhite}`}>Join SSV Network</Button>
            </Link>
            {/* <Badge variant="dot" color="secondary" anchorOrigin={{ vertical: 'top', horizontal: 'left' }} className={classes.buttonBadge}> */}
            <Button variant="outlined" className={`${classes.appBarButton} ${classes.appBarButtonWhite}`}>Prater Network</Button>
            {/* </Badge> */}
          </Box>

          <DarkModeSwitcher />

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

                <Link href={config.routes.HOME} className={appClasses.Link}>
                  <ListItem button>
                    <ListItemText primary="Overview" />
                  </ListItem>
                </Link>
                <Divider />

                <Link href={config.routes.OPERATORS.HOME} className={appClasses.Link} onClick={() => clearPaginationMemory()}>
                  <ListItem button>
                    <ListItemText primary="Operators" />
                  </ListItem>
                </Link>
                <Divider />

                <Link href={config.routes.VALIDATORS.HOME} className={appClasses.Link} onClick={() => clearPaginationMemory()}>
                  <ListItem button>
                    <ListItemText primary="Validators" />
                  </ListItem>
                </Link>
                <Divider />

                <DrawerButtonsContainers>
                  {isOverviewPage() && (
                    <DrawerButton>
                      <Link href={joinSsvLink} target="_blank">
                        <Button variant="outlined" className={classes.appBarButton} style={{ width: '90%', margin: 'auto' }}>
                          Join SSV Network
                        </Button>
                      </Link>
                    </DrawerButton>
                  )}
                  <DrawerButton>
                    {/* <Badge */}
                    {/*  variant="dot" */}
                    {/*  color="secondary" */}
                    {/*  anchorOrigin={{ vertical: 'top', horizontal: 'left' }} */}
                    {/*  className={classes.buttonBadge} */}
                    {/* > */}
                    <Link href="/">
                      <Button variant="outlined" className={classes.appBarButton} color="primary" style={{ width: '90%', margin: 'auto' }}>
                        Prater Network
                      </Button>
                    </Link>
                    {/* </Badge> */}
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
