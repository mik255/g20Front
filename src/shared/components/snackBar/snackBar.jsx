import React from 'react';
import './snackBar.css'
function SnackBar(props) {
    return (
        <div>
            <div id="snackbar">{props.message}</div>
        </div>
    );
}

export default SnackBar;