import { makeStyles } from '@material-ui/core/styles';

interface StatusEntry {
    is_active?: number;
    is_deleted?: boolean;
    is_valid?: boolean;
    status?: string;
}

export interface StatusProps {
    size?: string;
    entry?: StatusEntry;
    extendClass?: string
}

export const useStyles = makeStyles(() => ({
    Status: (props: StatusProps) => {
        let fontSize = 12;
        let height = 20;
        let borderRadius = 2;
        let fontWeight = 600;
        let color;
        let backgroundColor;
        let padding = '1px 3px 3px 3px';

        switch (props.size) {
            case 'big':
                fontSize = 14;
                height = 28;
                borderRadius = 4;
                fontWeight = 500;
                padding = '3px 5px 5px 5px';
                break;
        }

        // Active
        if (props.entry?.is_active === 1 || props.entry?.status === 'Active') {
            color = 'rgb(6, 182, 79)';
            backgroundColor = 'rgba(6, 182, 79, 0.12)';

        // Not active
        } else if (props.entry?.is_active === 0) {
            color = 'rgb(236, 28, 38)';
            backgroundColor = 'rgba(236, 28, 38, 0.12)';

        // Not validators (for operator status only)
        } else if (props.entry?.is_active === -1) {
            color = '#34455a';
            backgroundColor = '#e6eaf7';
        } else {
            color = 'rgb(236, 28, 38)';
            backgroundColor = 'rgba(236, 28, 38, 0.12)';
        }

        return {
            width: 'fit-content',
            height,
            fontSize,
            borderRadius,
            fontWeight,
            color,
            backgroundColor,
            padding,
        };
    },
}));
