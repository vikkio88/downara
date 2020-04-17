import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';

import './TypingDots.css'

const scrollToBottom = id => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
}

const Message = ({ character, message }) => {
    const selfMessage = Boolean(character);
    const colour = !selfMessage ? 'blue' : 'teal';
    return (
        <div className={`flex flex-row ${selfMessage ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`bg-${colour}-100 
                border-t-4 border-${colour}-500
                ${selfMessage ? 'border-r-4' : 'border-l-4'}
                rounded-b text-${colour}-900 
                px-4 py-4 shadow-md
                min-w-half m-3
                `}
                role="alert">
                <div className="flex">
                    <div>
                        <p className="font-bold">{character || 'Tu'}</p>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TypingDots = () => {
    return (
        <div id="wave" className="flex flex-row justify-end pr-2">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
};

const Container = () => {
    const { dialogue: { messages, waiting } } = useStoreon('dialogue');
    useEffect(() => scrollToBottom('chat'))
    return (
        <div
            id="chat"
            className="flex-1 flex flex-col items-stretch bg-gray-200 shadow overflow-y-auto"
        >
            {messages.map((m, i) => <Message key={`msg-${i}`} {...m} />)}
            {waiting && <TypingDots />}
        </div>
    );
};

export default Container;