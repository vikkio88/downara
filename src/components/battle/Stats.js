import React from 'react';
import { Progress } from '../common';

export default ({ actor }) => {
    const { hp, endurance, shield } = actor.getStats();
    const { hp: maxH, endurance: maxE, shield: maxS } = actor.getMaxValues();
    return (
        <>
            <Progress label={`Shield: ${shield}/${maxS}`} percentage={shield / maxS * 100} className="flex-1" noMargin />
            <Progress label={`Endurance : ${endurance}/${maxE}`} percentage={endurance / maxE * 100} className="flex-1" noMargin />
            <Progress label={`Health: ${hp}/${maxH}`} percentage={hp / maxH * 100} className="flex-1" noMargin />
        </>
    );
};