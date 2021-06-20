import React from 'react';
import styled from 'styled-components';

const getPercentage = (current, max) => (100 * current) / max;
const getLeft = percentage => `calc(${percentage}% - 5px)`;
const getValue = (percentage, max) => (max / 100) * percentage;

const Slider = ({initial, max,onChange})=>{
    const initialPercentage = getPercentage(initial, max);
    const sliderRef = React.useRef();
    const thumbRef = React.useRef();
    const diff = React.useRef();

    const handleMouseMove = event =>{
        let newX =
        event.clientX - diff.current -sliderRef.current.getBoundingClientRect().left;

        const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
        const start = 0;
 
        if (newX < start) {
            newX = 0;
        }
 
        if (newX > end) {
            newX = end;
        }

        const newPercentage = getPercentage(newX, end);
        const newValue = getValue(newPercentage, max);
        thumbRef.current.style.left = getLeft(newPercentage);
        onChange(newValue);
    };

    const handleMouseDown = event => {
        diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    };

    return(
        <>
            <StyledSlider ref={sliderRef}
                            style={{left:getLeft(initialPercentage)}}>
                <StyledThumb ref={thumbRef} onMouseDown={handleMouseDown}/>
            </StyledSlider>
        </>
    )
};

const StyledSlider = styled.div`
    position: relative;
    border-radius:3px;
    background:#dddddd;
    height: 15px;
`;

const StyledThumb = styled.div`
    width: 10px;
    height: 25px;
    border-radius: 3px;
    position: relative;
    top: -5px;
    opacity: 0.5;
    background: #823eb7;
    cursor: pointer;
`;

export default Slider;