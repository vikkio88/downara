import React from 'react';

const Tabs = ({ tabs = [], active = 0, onClick = () => { } }) => {
    if (tabs.length === 0) return null;

    return (
        <ul className="flex border-b flex-1 justify-center items-center bg-white">
            {tabs.map((header, index) => {
                const isActive = index === active;
                const linkClass = isActive ? 'text-blue-700'
                    : 'text-blue-500 hover:text-blue-800';
                return (
                    <li
                        key={index}
                        className={`flex flex-1 cursor-pointer ${isActive ? 'mb-px mr-1 bg-white' : 'mr-1 bg-gray-300'}`}
                        onClick={() => onClick(index)}
                    >
                        <span className={`flex-1 inline-block py-2 px-4 font-semibold ${linkClass}`}>{header}</span>
                    </li>
                );
            })}
        </ul>
    );
};

export default Tabs;