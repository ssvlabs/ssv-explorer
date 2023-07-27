import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useStylesText } from '~app/common/components/ShowMoreText/ShowMoreText.styles';

type Props = {
    text: string
};

const Button = styled.div`
  display: inline-block;
  text-underline: blue;
  cursor: pointer;
  color: blue;
`;

const buttonTexts = {
    showMore: 'Show more \u2193',
    showLess: 'Show less \u2191',
};

const ShowMoreText = (prop: Props) => {
    const { text } = prop;
    if (!text) {
        return null;
    }
    const classes = useStylesText();

    const [adjustText, setAdjustText] = useState('');
    const [buttonText, setButtonText] = useState(buttonTexts.showMore);
    const isLongText = text.length > 200;

    useEffect(() => {
        if (isLongText) {
            setAdjustText(`${text.substr(0, 150)}...`);
        } else {
            setAdjustText(text);
        }
    }, []);
    const showMoreLess = () => {
        if (buttonText === buttonTexts.showMore) {
            setButtonText(buttonTexts.showLess);
            setAdjustText(text);
        } else {
            setButtonText(buttonTexts.showMore);
            setAdjustText(`${text.substr(0, 150)}...`);
        }
    };
      return (
        <Grid className={classes.OperatorDescriptionWrapper}>{adjustText} {isLongText && <Button onClick={showMoreLess}>{buttonText}</Button>}</Grid>
      );
};

export default ShowMoreText;
