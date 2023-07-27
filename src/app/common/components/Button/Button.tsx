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
};

const AppButton = (props: ButtonProps) => {
    const classes = useStyles();
    const { text, type, height, width, disable, submitAction } = props;

    const onClick = () => {
        if (typeof submitAction === 'function') submitAction();
    };

    return (
      <Button
        onClick={onClick}
        disabled={disable}
        style={{ width, height }}
        className={type === 'primary' ? classes.Primary : classes.Secondary}
        >
        {text}
      </Button>
    );
};

export default AppButton;
