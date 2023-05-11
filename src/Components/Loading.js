import React from 'react';

export default function Loading(props) {
    var loadingBool = props.loadingBool;
    return(
        <div className={loadingBool ? "d-flex justify-content-center margin-top-45" : "hidden" }>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
        </div>
    )
}