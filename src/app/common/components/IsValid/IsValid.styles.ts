import { makeStyles } from '@material-ui/core/styles';

interface IsValidEntry {
    is_valid?: boolean;
}

export interface IsValidProps {
    size?: string;
    entry?: IsValidEntry;
}

export const useStyles = makeStyles(() => ({
    isValid: (props: IsValidProps) => {
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

        // Not valid
        if (!props.entry?.is_valid) {
            color = 'rgb(91, 108, 132)';
            backgroundColor = 'rgba(161, 172, 190, 0.12)';
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
