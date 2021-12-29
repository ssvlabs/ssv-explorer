import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    OperatorType: {
        width: 13,
        height: 13,
        marginLeft: 5,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    Verified: {
        width: 13,
        height: 13,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/verified_icon.svg)',
    },
    DappNode: {
        width: 13,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(/images/dapp_node_icon.svg)',
    },
}));
