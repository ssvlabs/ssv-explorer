import { makeStyles } from '@material-ui/core/styles';

const OPERATOR_STATUS_SUCCESS = 'success';

type StylesProps = {
    status: string;
    area: string;
};

export const useStyles = makeStyles((theme) => ({
    rhombus: {
        width: 20,
        height: 20,
        gridArea: '2 / 2 / 3 / 3',
        transform: 'rotate(45deg)',
        backgroundColor: ({ status }: StylesProps) => status === OPERATOR_STATUS_SUCCESS ? theme.colors.primaryBlue : theme.colors.gray20,
    },
    line: {
        height: 2,
        width: '100%',
        borderRadius: 11,
        backgroundColor: '#d1edfe',
        gridArea: ({ area } : StylesProps) => area,
    },
    rhombuSlotWrapper: {
        flexGrow: 1,
        width: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateRows: '1fr 20px 1fr',
        gridTemplateColumns: '1fr 20px 1fr',
    },
    OperatorConsensusSlot: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '.MuiTooltip-popper': {
            '.MuiTooltip-tooltip': {
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: 'white!important',
            },
        },
    },
    ConsensusOperatorId: {
        flexGrow: 0,
        width: '100%',
        fontWeight: 300,
        marginTop: '4px',
        color: '#63768b',
        lineHeight: 1.62,
        letterSpacing: 0.5,
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: 'Manrope',
        fontStretch: 'normal',
        fontSize: '10px!important',
    },
    tooltip: {
            '& .MuiTooltip-popper': {
                '& .MuiTooltip-tooltip': {
                    fontSize: 16,
                    fontWeight: 500,
                    backgroundColor: 'white!important',
                },
            },
    },
}));
