import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        flexGrow: 1,
        '& > .MuiPaper-root > .MuiToolbar-root': {
            paddingRight: 5,
        },
    },
    menuButton: {
        marginRight: theme.spacing(0),
        marginLeft: 'auto',
    },
    title: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 200,
    },
    appBarLink: {
        margin: 'auto',
        color: 'white',
        borderColor: 'white!important',
        marginRight: 10,
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white',
            borderColor: 'white',
        },
    },
    toolbarLinks: {
        textAlign: 'left',
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            marginLeft: 30,
            float: 'left',
            textDecoration: 'none',
        },
    },
    toolbarButtons: {
        float: 'right',
        textAlign: 'right',
        marginLeft: 'auto',
        marginRight: 0,
        paddingRight: 0,
    },
    drawer: {
        '& > .MuiDrawer-paper': {
            minWidth: 200,
        },
    },
    buttonBadge: {
        '& > .MuiButton-root': {
            minWidth: 180,
            paddingRight: 5,
        },
        '& > .MuiBadge-badge': {
            marginTop: 18,
            marginLeft: 15,
            backgroundColor: 'lightgreen',
        },
    },
}));
