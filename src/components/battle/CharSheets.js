import React, { useState } from 'react';
import get from 'lodash.get';
import { useStoreon } from 'storeon/react';
import { CloseRow, Tabs } from '../common';
import Stats from './Stats';

const ValueRow = ({ label = '', value = '' }) => {
    return (
        <tr className="border hover:bg-gray-300 bg-white">
            <td className="font-semibold border">{label}</td>
            <td>{value}</td>
        </tr>
    );
};

const Weapon = ({ name, effects, type, reach, hitDie }) => {
    const damage = get(effects, '0.health.range', null);
    return (
        <table className="table-fixed shadow-lg">
            <thead className="border bg-white">
                <tr className="text-lg">
                    <th colSpan="2">{name}</th>
                </tr>
            </thead>
            <tbody>
                <ValueRow label="type" value={type} />
                <ValueRow label="die" value={`${hitDie}d20`} />
                <ValueRow label="reach" value={reach} />
                <ValueRow label="damage" value={damage ? damage.split(':').join(' - ') : 0} />
            </tbody>
        </table>
    );
};

const Armour = ({ name, maxShield, parry, speedModifier }) => {
    return (
        <table className="table-fixed shadow-lg">
            <thead className="border bg-white">
                <tr className="text-lg">
                    <th colSpan="2">{name ? name : ' No Armour'}</th>
                </tr>
            </thead>
            <tbody>
                <ValueRow label="shield" value={`+${maxShield}`} />
                <ValueRow label="parry" value={`${parry}`} />
                <ValueRow label="movement" value={`${speedModifier}`} />
            </tbody>
        </table>
    );
};

const CharSheet = ({ char }) => {
    const { dispatch } = useStoreon();
    const [activeTab, setTab] = useState(0);
    const isPlayer = !(char.isAi());
    const header = <span className={`text-xl${isPlayer ? ' font-semibold' : ''}`}>{char.getName()}</span>;
    const weapon = char.getWeapon().toJs();
    const armour = char.getArmour().toJs();
    return (
        <div className="flex-1 flex flex-col m-2 bg-gray-300 border-2 border-solid rounded">
            <CloseRow onClose={() => dispatch('battle:unselectCharacter', char.id)} header={header} />
            <div className="flex flex-col">
                <Tabs tabs={['weapon', 'armour']} active={activeTab} onClick={tab => setTab(tab)} />
                <div className="flex flex-row justify-center items-center">
                    <div className="flex-1 flex flex-col">
                        {activeTab === 0 && <Weapon {...weapon} />}
                        {activeTab === 1 && <Armour {...armour} />}
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