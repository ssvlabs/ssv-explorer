import styled from 'styled-components';

const Header = styled.h1`
  ${({ theme }) => `
    font-size: 20px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 40px;
    color: ${theme.palette.text.primary}
  `}
`;

export default Header;
