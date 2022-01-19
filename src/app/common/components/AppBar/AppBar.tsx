import React, { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import { Box, Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import config from '~app/common/config';
import { defaultFont } from '~root/theme';
import ApiParams from '~lib/api/ApiParams';
import { useStyles } from './AppBar.styles';
import SsvNetwork from '~lib/api/SsvNetwork';
import { capitalize } from '~lib/utils/strings';
import SmartSearch from '~app/common/components/SmartSearch';
import { useStyles as useAppStyles } from '~app/components/Styles';
import DarkModeSwitcher from '~app/common/components/DarkModeSwitcher';

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

const GreenDot = styled.div`
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  border-width: 0;
  background-color: #20EEC8;
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
  const classes = useStyles();
  const appClasses = useAppStyles();
  const [isDrawerOpened, toggleDrawer] = useState(false);
  const [isSearchOpened, toggleSearch] = useState(false);
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
      {isSearchOpened ?
          (
            <AppBar position="fixed">
              <Toolbar>
                <SmartSearch inAppBar supportSmallScreen closeSearch={() => { toggleSearch(false); }} />
              </Toolbar>
            </AppBar>
          ) :
          (
            <AppBar position="fixed">
              <Toolbar>
                <Box>
                  <Typography variant="h6" className={classes.title}>
                    <Link href={config.routes.HOME} style={{ color: 'white', textDecoration: 'none' }}>
                      <span style={{ fontFamily: `"Fira Code", monospace, ${defaultFont}`, whiteSpace: 'nowrap', fontSize: 14 }}>
                        ssv.network <b style={{ color: '#DCE0E8' }}>explorer</b>
                      </span>
                    </Link>
                  </Typography>
                </Box>
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
                    {isOverviewPage() ? (
                      <Link href={joinSsvLink} target="_blank">
                        <Button variant="outlined" className={`${classes.appBarButton} ${classes.appBarButtonWhite}`}
                          style={{ textTransform: 'capitalize' }}>Join SSV Network</Button>
                      </Link>
                    ) : (
                      <SmartSearch inAppBar />
                    )}
                    <Button variant="outlined" disabled
                      className={`${classes.appBarButton} ${classes.appBarButtonWhite}`}
                      style={{ textTransform: 'capitalize' }}>
                      <GreenDot /> {capitalize(SsvNetwork.getActiveNetwork())} Network
                    </Button>
                    <DarkModeSwitcher style={{ marginLeft: 'auto', marginRight: 0, minWidth: 'auto', width: 40 }} />
                  </div>
                </Box>

                <Box className={classes.menuButtons} component="div"
                  display={{ xs: 'inline-flex', sm: 'inline-flex', md: 'inline-flex', lg: 'none' }}>
                  {!isOverviewPage() && (
                  <div className={classes.FirstSection}>
                    <div className={classes.toolbarButtons}>
                      <SmartSearch inAppBar closeSearch={() => {
                            toggleSearch(false);
                          }} />
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
                              <Button variant="outlined" className={classes.appBarButton}
                                style={{ width: '90%', margin: 'auto' }}>
                                Join SSV Network
                              </Button>
                            </Link>
                          </DrawerButton>
                          <DrawerButton>
                            <Link href="/" onClick={(event: any) => {
                              event.preventDefault();
                              event.stopPropagation();
                            }}>
                              <Button disabled variant="outlined" className={classes.appBarButton} color="primary"
                                style={{ width: '90%', margin: 'auto' }}>
                                <GreenDot /> Prater Network
                              </Button>
                            </Link>
                          </DrawerButton>
                        </DrawerButtonsContainers>
                      </MobileMenuContainer>
                    </List>
                  </Drawer>
                </Box>
              </Toolbar>
            </AppBar>
        )}
    </div>
  );
};

export default observer(AppBarComponent);
