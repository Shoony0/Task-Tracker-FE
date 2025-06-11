import React from 'react'

function Loader({ message }: { message: string }) {
    return (
        <div className="loader-overlay" id="loader">
            <div className="loader-content">
                <div className="spinner"></div>
                <p className="loader-text">{message}</p>
            </div>
        </div>
    );
};

export default Loader;
