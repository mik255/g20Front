
import React from 'react';
import './card.css'
function Card(props) {
    return (
        <div >
            <div className={`cards ${props.color}`}>
                <div className='row-title-area'>
                    <div className="title">{props.title}</div>
                    <i className="fa fa-bar-chart icon"></i> 
                    </div>

                <div className="value">{props.value}</div>
                <div className="stat">{props.description}</div>
            </div>
        </div>
    );
}

export default Card;