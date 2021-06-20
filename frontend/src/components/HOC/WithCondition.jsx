import React from 'react'

const WithCondition = (conditionalRenderingFn) => (Component)=>(props)=> 
conditionalRenderingFn(props)
    ? <h4>No available data</h4>
    : <Component { ...props } />

export default WithCondition