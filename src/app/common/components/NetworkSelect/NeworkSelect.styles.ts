import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  Wrapper: {
    borderRadius: 8,
    background: theme.colors.gray0,
    padding: '0 16px',
  },
  Root: {
    minWidth: 205,
    '&:after, &:before': {
      display: 'none !important',
    },
  },
  Select: {
    backgroundColor: 'initial !important',
  },
  Icon: {
    boxSizing: 'content-box',
    width: 24,
    height: 24,
  },

  ItemListWrapper: {
    width: 240,
    boxShadow: 'none',
    border: `1px solid ${theme.colors.gray20}`,
  },

  ItemList: {
    backgroundColor: `${theme.colors.white}`,
    padding: 0,
    '& li:hover': {
      backgroundColor: `${theme.colors.gray20} !important`,
    },
    '& li': {
      backgroundColor: `${theme.colors.white} !important`,
    },
    '& li:not(:last-child)': {
      borderBottom: `1px solid ${theme.colors.gray20}`,
    },
  },

  ItemWrapper: {
    display: 'flex',
    'align-items': 'center',
    padding: '6px 0',
    paddingRight: '6px',

    fontSize: 16,
    fontWeight: 600,
  },
  ItemIcon: {
    boxSizing: 'content-box',
    paddingRight: '12px',
  },
}));
