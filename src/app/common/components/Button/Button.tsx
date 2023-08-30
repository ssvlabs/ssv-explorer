import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from '~app/common/components/Button/Button.styles';

type ButtonProps = {
    text: string,
    type: string,
    width?: number,
    height?: number,
    disable: boolean,
    submitAction?: any,
    extendClass?: string,
};

const AppButton = (props: ButtonProps) => {
    const classes = useStyles();
    const { text, type, height, width, disable, submitAction, extendClass } = props;

    const onClick = () => {
        if (typeof submitAction === 'function') submitAction();
    };

    return (
      <Button
        disableTouchRipple
        onClick={onClick}
        disabled={disable}
        style={{ width, height }}
        className={`${type === 'primary' ? classes.Primary : classes.Secondary} ${extendClass} `}
        >
        {text}
      </Button>
    );
};

export default AppButton;
