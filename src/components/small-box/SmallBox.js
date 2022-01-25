import React from 'react';

const SmallBox = ({type = 'info', icon = 'ion-bag', count, title}) => {
    return (
        <div className={`small-box bg-${type}`}>
            <div className="inner">
                <h3>{count}</h3>
                <p>{title}</p>
            </div>
            <div className="icon">
                <i className={`${icon}`} />
            </div>
        </div>
    );
};

export default SmallBox;
