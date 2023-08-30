import { makeStyles } from '@material-ui/core/styles';
import ApplicationStore from '~app/common/stores/Application.store';
import BaseStore from '~app/common/stores/BaseStore';

const applicationStore: ApplicationStore = BaseStore.getInstance().getStore('Application');

export const useStyles = makeStyles((theme) => ({
    StatsContainer: {
        display: 'flex',
        gap: '24px',
        minHeight: '100px',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            gap: 12,
            marginBottom: 20,
        },
// @media (${mediaQueryDevices.mobileS}) {
//     flex-direction: column;
// }
//
// @media (${mediaQueryDevices.tablet}) {
//     flex-direction: row;
// margin-top: -50px;
// }
    },
   StatsBlock: {
       width: 424,
       display: 'flex',
       height: 108,
       minHeight: 129,
       borderRadius: 16,
       alignItems: 'center',
       alignContent: 'center',
       flexDirection: 'column',
       backgroundColor: `${applicationStore.isDarkMode ? theme.palette.background.default : '#fff'}`,
// @media (max-width: 368px ) {
//     width: 200px;
// }
// @media (max-width: 1329px) {
//     width: 368px;
// },
   },
    BlockHeader: {
        width: '100%',
        margin: 'auto',
        fontSize: 28,
        fontWeight: 500,
        marginBottom: 0,
        paddingLeft: 10,
        textAlign: 'center',
        paddingRight: 10,
        color: theme.colors.primaryBlue,
    },
    StatsBlockContent: {
        margin: 'auto',
        width: '100%',
        marginTop: 0,
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        color: theme.colors.gray40,
    },
}));
