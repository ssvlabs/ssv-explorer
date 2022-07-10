import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

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
  if (!text) return null;
  const [adjustText, setAdjustText] = useState('');
  const [buttonText, setButtonText] = useState(buttonTexts.showMore);
  
  const isLongText = text.length > 400;

  useEffect(() => {
      if (isLongText) {
          setAdjustText(`${text.substr(0, 250)}...`);
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
          setAdjustText(`${text.substr(0, 250)}...`);
      }
  };
    return (
      <div>{adjustText} {isLongText && <Button onClick={showMoreLess}>{buttonText}</Button>}</div>
    );
};

export default ShowMoreText;
