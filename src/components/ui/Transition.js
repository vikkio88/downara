import React from 'react';
import './Transition.css';

const Transition = ({ message = '' }) => {
    return (
        <div
            id="transitionWrapper"
            className="
            container 
            h-screen mx-auto
            flex flex-col justify-center items-center
            bg-gray-200 text-4xl
            "
        >
            <div id="transitionMessageWrapper">
                {message}
            </div>
        </div>
    );
}


export default Transition;