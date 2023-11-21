import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import { Box, Link, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import { useLocation, useRouteMatch } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import config from '~app/common/config';
import ApiParams from '~lib/api/ApiParams';
import { useStyles } from './AppBar.styles';
import SsvNetwork from '~lib/api/SsvNetwork';
import { capitalize } from '~lib/utils/strings';
import { useStores } from '~app/hooks/useStores';
import { Button } from '~app/common/components/Button';
import SmartSearch from '~app/common/components/SmartSearch';
import { useStyles as useAppStyles } from '~app/components/Styles';
import ApplicationStore from '~app/common/stores/Application.store';
import DarkModeSwitcher from '~app/common/components/DarkModeSwitcher';
import Grid from '@material-ui/core/Grid';
import { Chain } from '~lib/utils/ChainService';

const DrawerButtonsContainers = styled.div`
  font-size: 12px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  width: 100%;
  & > * button, & > * button[disabled]  {
    font-weight: bold;
    color: white;
    border-color: white;
    text-decoration: none;
    font-size: 12px;
  }
`;

const DrawerButton = styled(Link)`
  width: 100%;
  margin: auto;
  margin-top: 10px;
`;

const MobileMenuContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 200px;
  text-align: center;
  align-content: center;
  align-items: center;
  & > * .MuiListItemText-primary {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
`;

const AppBarComponent = () => {
  const stores = useStores();
  const appClasses = useAppStyles({});
  const [isDrawerOpened, toggleDrawer] = useState(false);
  const [isSearchOpened, toggleSearch] = useState(false);
  const joinSsvLink = config.links.LINK_SSV_WEBAPP;
  const applicationStore: ApplicationStore = stores.Application;
  const currentNetwork = SsvNetwork.getActiveNetwork();
  let isWhiteBackground = false;

  const whiteBackgroundRoutes = [
        config.routes.OPERATORS.OPERATOR,
        config.routes.VALIDATORS.VALIDATOR,
      ];

  // eslint-disable-next-line no-restricted-syntax
  for (const route of whiteBackgroundRoutes) {
    if (useRouteMatch(route)) {
      isWhiteBackground = true;
      break;
    }
  }
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
  const isPausedPage = () => {
    const location = useLocation();
    return location.pathname === '/paused';
  };
  const clearPaginationMemory = () => {
    ApiParams.initStorage(true);
  };
  if (config.FEATURE.ANNOUNCEMENT) {
    return null;
  }
  const paused = isPausedPage();

  const classes = useStyles({ whiteBackgroundColor: isWhiteBackground });

  return (
    <div className={classes.root} id="back-to-top-anchor">
      {isSearchOpened ?
            (
              <AppBar>
                {paused ? <></> : (
                  <Toolbar>
                    <SmartSearch inAppBar supportSmallScreen closeSearch={() => { toggleSearch(false); }} />
                  </Toolbar>
                  )}
              </AppBar>
            ) :
            (
              <AppBar>
                <Toolbar>
                  <Box>
                    <Typography variant="h6" className={classes.title}>
                      <Link href={paused ? config.routes.PAUSED.HOME : config.routes.HOME} style={{ color: 'white', textDecoration: 'none' }}>
                        <img width={133} height={40} src={`/images/website_logo_${applicationStore.isDarkMode ? 'light' : 'dark'}.svg`} alt="Copy" />
                      </Link>
                    </Typography>
                  </Box>
                  {paused ? <></> : (
                    <Grid className={classes.AppBarWrapper}>
                      <Box className={classes.toolbarLinks} component="div"
                        display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
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

                      <Box style={{ marginLeft: 'auto' }} component="div"
                        display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
                        <div className={classes.toolbarButtons}>
                          {!isOverviewPage() && <SmartSearch placeholder={'Search...'} inAppBar />}
                          <Link href={joinSsvLink} target="_blank">
                            <Button disable={false} type={'primary'} text={'Join SSV Network'} />
                          </Link>
                          <Button disable={false} extendClass={classes.PraterButton} type={'secondary'}
                            text={`${capitalize(currentNetwork)}`} />
                          <DarkModeSwitcher style={{ marginLeft: 'auto', marginRight: 0, minWidth: 'auto', width: 70 }} />
                        </div>
                      </Box>

                      <Box className={classes.menuButtons} component="div"
                        display={{ xs: 'inline-flex', sm: 'inline-flex', md: 'inline-flex', lg: 'none' }}>
                        {!isOverviewPage() && (
                        <div className={classes.FirstSection}>
                          <div className={classes.toolbarButtons}>
                            <SmartSearch inAppBar closeSearch={() => toggleSearch(false)} />
                          </div>
                        </div>
                            )}
                        <div className={classes.SecondSection}>
                          {!isSearchOpened && !isOverviewPage() && (
                          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleSearch(true)}>
                            <SearchIcon className={classes.SearchIcon} />
                          </IconButton>
                              )}
                        </div>
                        <DarkModeSwitcher style={{ marginLeft: 'auto', marginRight: 0 }} />
                        <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
                          <MenuIcon />
                        </IconButton>
                        <Drawer
                          className={classes.drawer}
                          anchor="top"
                          open={isDrawerOpened}
                          onClose={() => toggleDrawer(false)}
                            >
                          <List style={{ textAlign: 'center', paddingBottom: 50 }}>
                            <ListItem style={{ paddingBottom: 15 }}>
                              <CloseIcon
                                onClick={() => {
                                        toggleDrawer(false);
                                      }}
                                style={{ marginLeft: 'auto', marginRight: 0 }}
                                  />
                            </ListItem>

                            <MobileMenuContainer>
                              <Link href={config.routes.HOME} className={appClasses.Link}>
                                <ListItem button>
                                  <ListItemText primary="Overview" style={{ textTransform: 'uppercase' }} />
                                </ListItem>
                              </Link>

                              <Link href={config.routes.OPERATORS.HOME} className={appClasses.Link}
                                onClick={() => clearPaginationMemory()}>
                                <ListItem button>
                                  <ListItemText primary="Operators" />
                                </ListItem>
                              </Link>

                              <Link href={config.routes.VALIDATORS.HOME} className={appClasses.Link}
                                onClick={() => clearPaginationMemory()}>
                                <ListItem button>
                                  <ListItemText primary="Validators" />
                                </ListItem>
                              </Link>

                              <DrawerButtonsContainers>
                                <DrawerButton>
                                  <Link href={joinSsvLink} target="_blank">
                                    <Button disable={false} type={'primary'} text={'Join SSV Network'} />
                                  </Link>
                                </DrawerButton>
                                <DrawerButton>
                                  <Link href="/" onClick={(event: any) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                  }}>
                                    <Button disable={false} type={'secondary'}
                                      text={`${capitalize(currentNetwork)}`} />
                                  </Link>
                                </DrawerButton>
                              </DrawerButtonsContainers>
                            </MobileMenuContainer>
                          </List>
                        </Drawer>
                      </Box>
                    </Grid>
                    )}
                </Toolbar>
              </AppBar>
            )}
    </div>
  );
};

export default observer(AppBarComponent);
