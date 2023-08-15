import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    TitleLabel: {
        paddingLeft: 15,
        color: '#97a5ba',
        fontSize: 20,
    },
    tableWithBorder: {
        borderRadius: 6,
        fontSize: 18,
        '& h3': {
            color: theme.palette.divider,
            fontWeight: 900,
            fontSize: 18,
        },
        '& > .MuiTableContainer-root': {
            borderRadius: 6,
        },
        '& .MuiTableCell-head': {
            fontWeight: 'bold',
            fontSize: 12,
            color: '#A1ACBE',
            maxHeight: 26,
            paddingTop: 8,
            paddingBottom: 8,
        },
    },
    TableWrapper: {
        backgroundColor: theme.colors.white,
        '& .MuiTableCell-stickyHeader': {
            height: 16,
            backgroundColor: theme.colors.white,
        },
    },
    TableStyledRow: {
            [theme.breakpoints.down('xs')]: {
                paddingBottom: '50px',
                width: '100%',
                height: 213,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: `1px solid ${theme.colors.gray20}`,
                margin: 32,
            },
    },
    OperatorStyledCell: {
            [theme.breakpoints.down('xs')]: {
                width: '90px',
                border: 'none',
            },
    },
    TableCellLabel: {
        fontSize: 12,
        fontWeight: 500,
        width: 90,
        lineHeight: 1.62,
        color: theme.colors.gray40,
    },
    tableHeaderOffOnMobile: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    tablePaginationMobileSize: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            overflowX: 'auto',
            display: 'flex',
        },
    },
}));
