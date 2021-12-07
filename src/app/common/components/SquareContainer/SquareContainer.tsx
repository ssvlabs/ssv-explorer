import styled from 'styled-components';

export const SquareInternalContainer = styled.div``;

export const SquareContainer = styled.div<({ maxHeight?: number })>`
  position: relative;
  width: 100%;
  overflow: hidden;
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  &:before{
    content: "";
    display: block;
    padding-top: 100%;
  }
  & ${SquareInternalContainer} {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    position:  absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
  }
`;
