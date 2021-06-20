import styled from 'styled-components';
import {
  setColor,
  setRem,
  setLetterSpacing,
  setFont,
  setBorder,
  setTransition
} from '../../styles';

export const Button = styled.button`
    cursor: pointer;
    font-size: 16px;
    margin: 0 1em;
    padding: 0.25em 1em;
    border: ${props =>
        props.primary ? '2px solid var(--clr-primary-2)' : '2px solid palevioletred'};
    border-radius: 3px;
    background: ${props => props.primary ? "var(--clr-primary-2)" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    transition: 0.5s all ease-out;
    &:hover {
        background: ${props => props.primary ? "white" : "palevioletred"};
        color: ${props => props.primary ? "var(--clr-primary-2)" : "white"};
    }

`;
  
 
  
export const ClearButton = styled(Button)`
    color: tomato;
    border-color: tomato;
`;

export const LinkButton = styled(Button)`
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
`;

export const PrimaryBtn= styled.button`
    display:inline-block;
    background:${setColor.primaryColor};
    color:${setColor.mainWhite};
    text-transform:capitalize;
    font-size:${setRem(18)};
    ${setFont.main};
    padding: ${setRem(17)} ${setRem(36)};
    ${setBorder({color:setColor.primaryColor})};
    ${setLetterSpacing()};
    ${setTransition()};

    &:hover{
        background:transparent;
        color:${setColor.primaryColor};
    }
    ${props => `margin: ${props.t || 0} ${props.r || 0} ${props.b || 0} ${props.l || 0}`};
    text-decoration:none;
    cursor: pointer;
`;

// Define our button, but with the use of props.theme this time
export const ThemedButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;
 
// We are passing a default theme for Buttons that aren't wrapped in the ThemeProvider
ThemedButton.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
};
 