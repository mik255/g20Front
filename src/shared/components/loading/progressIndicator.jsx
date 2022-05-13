import React from 'react';
import './progressIndicator.css'
function ProgressIndicator(props) {
    return (
        <div className=' text-center justify-content-center'>
        <div class="lds-ripple "><div></div><div></div></div>
        <p className='alert alert-info '>
        <strong>carregando!</strong>...
        </p>
      
        </div>
    );
}

export default ProgressIndicator