import { makeStyles } from '@material-ui/core/styles';
import { defaultFont } from '~root/theme';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 64,
        flexGrow: 1,
        '& > .MuiPaper-root > .MuiToolbar-root': {
            paddingRight: 5,
            backgroundColor: '#A1ACBE',
            justifyContent: 'space-between',
        },
    },
    menuButtons: {
        marginRight: 24,
    },
    FirstSection: {
        display: 'none',
        '@media (min-width:768px)': {
            display: 'inline-flex',
        },
    },
    SecondSection: {
        display: 'none',
        '@media (max-width:767px)': {
            display: 'inline-flex',
        },
    },
    SmartSearchWrapper: {
        display: 'flex',
    },
    menuButton: {
        // marginRight: 24,
        // marginLeft: 'auto',
    },
    SearchIcon: {
        width: 24,
        height: 24,
    },
    title: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 200,
        marginTop: -9,
    },
    appBarLink: {
        textTransform: 'uppercase',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        margin: 'auto',
        fontFamily: defaultFont,
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
        borderColor: '#5B6C84',
        marginRight: 10,
        '&.Mui-disabled': {
            border: '1px solid #5B6C84',
        },
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white',
        },
    },
    appBarButtonWhite: {
        color: 'white!important',
        borderColor: '#5B6C84',
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white!important',
        },
    },
    toolbarLinks: {
        textAlign: 'left',
        marginLeft: 50,
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
        height: '100%',
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
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            textDecoration: 'none',
        },
    },
    drawer: {
        '& > .MuiDrawer-paper': {
            backgroundColor: '#A1ABBE',
            color: 'white',
            fontWeight: 'bold',
            minWidth: 200,
            textAlign: 'center',
            fontSize: 12,
            '& > ul > div': {
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                '& > a': {
                    width: '100%',
                    fontWeight: 'bold',
                    '& > .MuiListItem-root': {
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                    },
                },
            },
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
