import React from 'react';
import { useStoreon } from 'storeon/react';
import { Segment } from './common';
import { LABELS } from 'downara';

const Inventory = () => {
    const { gameState: { inventory } } = useStoreon('gameState');
    const { money } = inventory;
    return (
        <>
            <Segment row>
                <Segment style={{ flex: 1 }} className="text-center">
                    {LABELS.MONEY}
                </Segment>
                <Segment style={{ flex: 3 }} center className="text-center text-bold" row>
                    {money} {LABELS.CURRENCY_SYMBOL}
                </Segment>
            </Segment>
        </>
    )
};

export default Inventory;