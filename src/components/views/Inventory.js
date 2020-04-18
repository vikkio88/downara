import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import { Segment } from './common';
import { LABELS } from 'downara';

const itemFactory = (type, name, description, quantity = 1) => {
    return {
        name, description, quantity, type, actions: ITEM_TYPES_ACTIONS[type]
    };
};
const ITEM_TYPES = {
    WEAPON: 'weapon',
    WEARABLE: 'wearable',
    CONSUMABLE: 'consumable',
    QUEST_ITEM: 'quest_item',
    USABLE: 'usable'
};

const ITEM_ACTIONS = {
    EQUIP: 'equip',
    DROP: 'drop',
    USE: 'use',
    CONSUME: 'consume'
}

const ITEM_TYPES_ACTIONS = {
    [ITEM_TYPES.WEAPON]: [ITEM_ACTIONS.EQUIP, ITEM_ACTIONS.DROP],
    [ITEM_TYPES.WEARABLE]: [ITEM_ACTIONS.EQUIP, ITEM_ACTIONS.DROP],
    [ITEM_TYPES.CONSUMABLE]: [ITEM_ACTIONS.CONSUME, ITEM_ACTIONS.DROP],
    [ITEM_TYPES.QUEST_ITEM]: [],
    [ITEM_TYPES.USABLE]: [ITEM_ACTIONS.USE, ITEM_ACTIONS.DROP],
};

const items = [
    itemFactory(ITEM_TYPES.WEAPON, 'Cutidduzzu', 'un piccolo coltellino svizzero'),
    itemFactory(ITEM_TYPES.WEARABLE, 'Elmetto Bauli®', 'un elmetto ottenuto dal cartone del panettone Bauli®'),
    itemFactory(ITEM_TYPES.QUEST_ITEM, 'Pane', '½ Kg di pane e due panini vuoti'),
    itemFactory(ITEM_TYPES.CONSUMABLE, 'Goleador alla coca-cola', 'Rimedio contro qualsiasi ferita', 4),
    itemFactory(ITEM_TYPES.CONSUMABLE, 'Cerotto', 'Cura +1', 10),

];

const Item = ({ quantity, name, description }) => {
    const [toggle, setToggle] = useState(false);
    return (
        <Segment onClick={() => setToggle(!toggle)}>
            <div className="flex-1 flex flex-row justify-between">
                <div>
                    {quantity}
                </div>
                <div>
                    {name}
                </div>
                <div>
                    Actions
                </div>
            </div>
            {toggle && (
                <div>
                    {description}
                </div>
            )}
        </Segment>
    );
};
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
            {items.map((item, i) => (<Item key={`item-row-${i}`} {...item} />))}
        </>
    )
};

export default Inventory;