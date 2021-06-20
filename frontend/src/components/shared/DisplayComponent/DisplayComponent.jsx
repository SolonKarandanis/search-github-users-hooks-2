import React from 'react'

const DisplayComponent = React.memo((props) =>{
    return (
        props.children()
    );
});

export default DisplayComponent
