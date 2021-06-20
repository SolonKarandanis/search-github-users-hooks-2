import React from 'react'
import loadingImage from '../../images/preloader.gif';

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) =>{
    return isLoading? (
        <img src={loadingImage} 
          className="loading-img" 
          alt="loading"/>
    ): (
        <WrappedComponent {...otherProps} />
    )
}



export default WithSpinner;