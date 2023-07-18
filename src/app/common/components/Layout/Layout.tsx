import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import { useStores } from '~app/hooks/useStores';
import Spinner from '~app/common/components/Spinner';
import ScrollTop from '~app/common/components/ScrollToTop';
import BarMessage from '~app/common/components/BarMessage';
import ApplicationStore from '~app/common/stores/Application.store';
import { useStyles } from '~app/common/components/Layout/Layout.styles';

const Layout = ({ children }: any) => {
    const classes = useStyles();
    const stores = useStores();
    const applicationStore: ApplicationStore = stores.Application;

    const renderSpinner = () => {
        if (applicationStore.isLoading) {
            return <Spinner />;
        }
        return null;
    };

    const spinner = renderSpinner();

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid xs={12} sm={12} md={12} lg={12} className={classes.ChildrenWrapper} item>
          { children }
        </Grid>
        <BarMessage />
        {spinner}
        <ScrollTop />
      </Grid>
    );
};

export default observer(Layout);
