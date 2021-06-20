import React from 'react';
import styled from 'styled-components';

const Filter = React.memo(({ dispatch }) =>{

    const handleChange = (event) =>{
        if(event.target.value==='SHOW_ALL'){
            dispatch({ type: 'SHOW_ALL' });
        }else if(event.target.value==='SHOW_COMPLETE'){
            dispatch({ type: 'SHOW_COMPLETE' });
        }else{
            dispatch({ type: 'SHOW_INCOMPLETE' });
        }
    };
    return (
        <Wrapper>
            <label htmlFor="items">Choose:</label>
            <select name="items" id="items" onChange={handleChange}>
                <option value='SHOW_ALL'>
                    Show All
                </option>
                <option value='SHOW_COMPLETE'>
                    Show Complete
                </option>
                <option value='SHOW_INCOMPLETE'>
                    Show Incomplete
                </option>
            </select>
            <div className="select-icon">
                <svg focusable="false" 
                    viewBox="0 0 104 128" 
                    width="25" height="35" className="icon">
                    <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
                </svg>
            </div>
        </Wrapper>
    );
});

export default Filter;

const Wrapper = styled.div`
    margin-bottom: 1rem;

    select{
        width:100%;
        height: 40px;
        font-size:100%;
        font-weight:bold;
        cursor:pointer;
        border-radius:0;
        background-color: var(--clr-red-dark);
        border: none;
        border-bottom: 2px solid #962d22;
        color: white;
        padding: 5px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        transition: color 0.3s ease, background-color 0.3s ease, 
            border-bottom-color 0.3s ease;

        &:hover,
        &:focus{
            color:var(--clr-red-dark);
            background-color: white;
            border-bottom-color: #DCDCDC;
        }

    
    }

    .select-icon{
        position:absolute;
        top:54px;
        right:4px;
        width:38px;
        height: 36px;
        pointer-events: none;
        border: 2px solid #962d22;
        padding-left: 5px;
        transition: background-color 0.3s ease, border-color 0.3s ease;

        & svg.icon{
            transition: fill 0.3s ease;
            fill: white;
        }
    }

    select:hover ~ .select-icon,
    select:focus ~ .select-icon {
        background-color: white;
        border-color: #DCDCDC;
    }
    select:hover ~ .select-icon svg.icon,
    select:focus ~ .select-icon svg.icon {
        fill: #c0392b;
    }



    /* For IE <= 11 */
    select::-ms-expand {
        display: none;
    }
`;