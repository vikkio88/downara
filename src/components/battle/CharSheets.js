import React from 'react';
import { useStoreon } from 'storeon/react';
import { CloseRow } from '../common';
import Stats from './Stats';

const Weapon = ({ name, effects, type, reach, hitDie }) => {
    return (
        <>
            <strong>{name}</strong>
            <span>
                <strong>type</strong> {type}
            </span>
            <span>
                <strong>die</strong> {`${hitDie}d20`}
            </span>
        </>
    );
};

const CharSheet = ({ char }) => {
    const { dispatch } = useStoreon();
    const isPlayer = !(char.isAi());
    const header = isPlayer ? <strong>{char.getName()}</strong> : char.getName();
    const weapon = char.getWeapon().toJs();
    return (
        <div className="flex-1 flex flex-col m-2 bg-gray-300 border-2 border-solid rounded">
            <CloseRow onClose={() => dispatch('battle:unselectCharacter', char.id)} header={header} />
            <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center">
                    <div className="flex-1 flex flex-col">
                        <Weapon {...weapon} />
                    </div>
                    <div className="flex-1">
                        Armour
                    </div>
                </div>
                <Stats stats={char.getStats()} maxes={char.getMaxValues()} />
            </div>
        </div>
    );
};


export default ({ characters = [] }) => {
    return (
        <div className="flex-1 flex flex-row mb-5 justify-between">
            {characters.map(char => <CharSheet key={char.id} char={char} />)}
        </div>
    );
};