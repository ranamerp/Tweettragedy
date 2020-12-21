import React from 'react';

const Loading = () => {
    return ( 

    <div style={{
    height:"100vh", 
    display: "flex", 
    justifyContent:"center", 
    alignItems:"center"
    }}>
        <div>Loading may take a few minutes </div>
        <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
        <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
        <span className="sr-only">Loading...</span>
        </div>
    </div>
        );
}
 
export default Loading;