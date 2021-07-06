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
        fontSize: 16,
        margin: 'auto',
        color: 'white',
        borderColor: 'white!important',
        marginRight: 10,
        '& > a': {
            color: 'white',
            borderColor: 'white',
        },
        '& > a:hover, & > a:active, & > a:focus': {
            color: '#D7D7D7',
        },
    },
    appBarLinkActive: {
        color: '#D7D7D7!important',
    },
    appBarButton: {
        margin: 'auto',
        color: theme.palette.text.primary,
        borderColor: theme.palette.text.primary,
        marginRight: 10,
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white',
            borderColor: 'white',
        },
    },
    appBarButtonWhite: {
        color: 'white!important',
        borderColor: 'white!important',
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white!important',
            borderColor: 'white!important',
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
        display: 'flex',
        marginRight: 0,
        marginLeft: 'auto',
        alignItems: 'center',
        '& > .MuiButtonBase-root, & > .MuiTypography-root > .MuiButtonBase-root': {
            width: '100%',
            height: 40,
            minWidth: 180,
            marginRight: 10,
        },
        '& > .MuiTypography-root': {
            marginRight: 10,
        },
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
