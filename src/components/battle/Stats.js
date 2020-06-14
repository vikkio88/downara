import React from 'react';
import './Stat.css';

export const VARIANTS = {
    GRAY: 'gray',
    RED: 'red',
    GREEN: 'green'
};

export const Stat = ({ label, value, max, variant, noLabel = false }) => {
    const percentage = value / max * 100;
    return (
        <div className="relative">
            {!noLabel && (
                <div className="flex z-10 items-center justify-center absolute w-full pt-1" >
                    <div>
                        <span className={`text-xs font-semibold inline-block px-2 uppercase text-${variant}-600`}>
                            {label}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className={`text-xs font-semibold inline-block text-${variant}-600`}>
                            {`${value} / ${max}`}
                        </span>
                    </div>
                </div>
            )}
            <div className={`overflow-hidden h-2 ${noLabel ? '' : 'mb-4'} text-xs flex bg-${variant}-200`}>
                <div id="statValue" style={{ width: `${percentage}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${variant}-500`}></div>
            </div>
        </div>
    );
};

export const HP = ({ value, max }) => {
    return <Stat value={value} max={max} variant={VARIANTS.RED} noLabel />;
};

export const Endurance = ({ value, max }) => {
    return <Stat value={value} max={max} variant={VARIANTS.GREEN} noLabel />;
};

export default ({ stats, maxes }) => {
    const { hp, endurance, shield } = stats;
    const { hp: maxH, endurance: maxE, shield: maxS } = maxes;
    return (
        <>
            <Stat label={`Shield`} value={shield} max={maxS} variant={VARIANTS.GRAY} />
            <Stat label={`Endurance`} value={endurance} max={maxE} variant={VARIANTS.GREEN} />
            <Stat label={`Health`} value={hp} max={maxH} variant={VARIANTS.RED} />
        </>
    );
};