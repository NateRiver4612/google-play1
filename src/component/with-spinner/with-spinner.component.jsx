import React from 'react';
import Spinner from '../spinner/spinner.component';

const WithSpinner = WrappedComponent =>({isLoading,...otherProps})=>{

    return isLoading ? (
      <Spinner></Spinner>
    ):(
        <WrappedComponent {...otherProps}/>
    );

}

export default WithSpinner;