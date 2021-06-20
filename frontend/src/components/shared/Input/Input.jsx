import React from 'react';
import styled from 'styled-components';
import { validate } from '../util/validators';

const InputComponent = React.memo(({handler,label , ...otherProps}) =>{
    const ref = React.useRef();
    // console.log(otherProps);
    React.useEffect(() => {
        if (otherProps.isfocus) {
          ref.current.focus(); // (3)
        }
      }, [otherProps.isfocus]);
    return(
        <React.Fragment>
            <InputWrapper>
                <input  {...otherProps}
                    onChange={handler}
                    ref={ref}/>
                {label ? 
                (<label className={`${otherProps.value.length? 'shrink': ''}`}> 
                    {label}
                </label>) : null}
            </InputWrapper>
        </React.Fragment>
    )
});



const InputWrapper = styled.div`
    --sub-color: grey;
    --main-color: black;
    position: relative;
    margin:45px 0;

    input{
        background: none;
        background-color: white;
        color: var(--sub-color);
        font-size: 18px;
        padding:10px 10px 10px 5px;
        display:block;
        width: 100%;
        border: none;
        border-radius:0;
        border-bottom: 1px solid var(--sub-color);
        margin: 25px 0;

        &:focus{
            outline:none;
        }
        &:focus ~ .form-input-label{
            transform:translate3d(0,-14px,0);
            font-size: 12px;
            color: var(--sub-color);
        }
    }

    input[type='password']{
        letter-spacing: 0.3rem;
    }

    input[type='password']:not(:placeholder-shown):invalid{
        color:red
    }

    label{
        color: $sub-color;
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        transition: 300ms ease all;
    
        &.shrink {
            transform:translate3d(0,-14px,0);
            font-size: 12px;
            color: var(--sub-color);
        }
    }

    @mixin shrinkLabel{
        transform:translate3d(-14px,0,0);
        font-size: 12px;
        color: var(--sub-color);
    }
`;

export default InputComponent;