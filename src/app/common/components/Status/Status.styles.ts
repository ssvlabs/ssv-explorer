import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    Status: (props: any) => ({
        width: 'fit-content',
        height: props.isBig ? 28 : 20,
        fontSize: props.isBig ? 14 : 12,
        borderRadius: props.isBig ? 2 : 0,
        fontWeight: props.isBig ? 500 : 600,
        color: props.isActive ? 'rgb(6, 182, 79)' : 'rgb(236, 28, 38)',
        backgroundColor: props.isActive ? 'rgba(6, 182, 79, 0.12)' : 'rgba(236, 28, 38, 0.12)',
        padding: props.isActive ? '2px 5px 3px 4px' : '2px 4px 3px',
    }),
}));
