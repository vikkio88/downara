import React from 'react';
import { useStoreon } from 'storeon/react';
import { Segment } from './common';
import { LABELS } from 'downara';
const items = [
    { name: 'Knife', description: 'weapon', quantity: 1 },
    { name: 'Bread', description: 'mezzo chilo di pane, due panini vuoti', quantity: 1 },
    { name: 'Health Potion', description: '+50 Health', quantity: 4 },
];
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
            {items.map(({ quantity, name, description }) => (
                <Segment row center>
                    <Segment style={{ flex: 1 }} className="text-center">
                        {quantity}
                    </Segment>
                    <Segment style={{ flex: 3 }} row>
                        {name} - {description}
                    </Segment>
                    <Segment style={{ flex: 1 }} row>
                        Actions
                        </Segment>
                </Segment>
            ))}
        </>
    )
};

export default Inventory;