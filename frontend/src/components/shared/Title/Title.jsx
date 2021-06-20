import React from 'react';
import styled from 'styled-components';
import { setRem, setFont,setLetterSpacing } from '../../../styles';

// We use memo which acts like PureComponent in the fact that it will stop 
// re-renders when the props haven’t changed. Our code updated looks like
const Title= React.memo(props =>{
    const { className,title,center} = props;
    return (
        <h3 className={className}>
            {title}
        </h3>
    )
});

export default styled(Title)`
    font-size: ${setRem(36)};
    text-transform: capitalize;
    ${setLetterSpacing(5)};
    ${setFont.slanted};
    text-align:${props => props.center? "center":"left"};
`;

///////////////////////////////////////areEqual//////////////////////////////////////
// Ok so let’s get a little more advanced and talk about custom equality.
// By default, memo only does a shallow comparison of props and prop’s objects.
// You can pass a second argument to indicate a custom equality check:

// React.memo(Component, [areEqual(prevProps, nextProps)]);
// This is similar to shouldComponentUpdate but the inverse i.e. returning true in 
// shouldComponentUpdate causes another render whereas areEqual is the opposite.

// Imagine we had a Person component that accepted a prop person which is an object, 
// we could check if the name is the same.

// const areEqual = (prevProps, nextProps) => {
//   return (prevProps.name === nextProps.name)
// };
// React.memo(Person, areEqual);