import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    '@global': {
        'body': {
            backgroundColor: theme.colors.applicationBackground,
            '& *': {
                fontFamily: 'Manrope, sans-serif !important',
            },
        },
        '.MuiPaper-root.MuiAutocomplete-paper.MuiPaper-elevation1.MuiPaper-rounded ul': {
            maxHeight: '493px!important',
            '@media (max-width:540px)': {
                maxHeight: '558px!important',
            },
        },
    },
    root: {
        marginTop: 38,
        height: 48,
        flexGrow: 1,
        '& > .MuiPaper-root > .MuiToolbar-root': {
            paddingTop: 18,
            paddingRight: 5,
            justifyContent: 'space-between',
            backgroundColor: (props: any) => props.whiteBackgroundColor ? theme.colors.white : theme.colors.gray10,
        },
        '& > .MuiPaper-elevation4': {
            boxShadow: 'none',
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
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.25,
        color: theme.colors.gray90,
        margin: 'auto',
        borderColor: 'white!important',
        marginRight: 10,
        '& > a': {
            color: 'white',
            borderColor: 'white',
        },
        '& > a:hover, & > a:active, & > a:focus': {
            color: '#1ba5f8',
        },
    },
    appBarLinkActive: {
        color: '#1ba5f8 !important',
    },
    appBarButton: {
        margin: 'auto',
        marginRight: 10,
        borderColor: '#5B6C84',
        color: theme.palette.text.primary,
        '&.Mui-disabled': {
            border: '1px solid #5B6C84',
        },
        '& > a, & > a:hover, & > a:active, & > a:focus': {
            color: 'white',
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
            // width: '100%',
            // height: 40,
            // minWidth: 180,
            // marginRight: 10,
            boxShadow: 'none',
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
