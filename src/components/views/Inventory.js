import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import { Segment } from './common';
import { LABELS } from 'downara';
import { Icon } from 'components/common';

const itemFactory = (type, name, description, { quantity = 1, props = {} } = {}) => {
    return {
        name, description, quantity, type, actions: ITEM_TYPES_ACTIONS[type], props
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
    itemFactory(ITEM_TYPES.WEAPON, 'Cutidduzzu', 'un piccolo coltellino svizzero', { damage: 3 }),
    itemFactory(ITEM_TYPES.WEARABLE, 'Elmetto Bauli®', 'un elmetto ottenuto dal cartone del panettone Bauli®'),
    itemFactory(ITEM_TYPES.QUEST_ITEM, 'Pane', '½ Kg di pane e due panini vuoti'),
    itemFactory(ITEM_TYPES.CONSUMABLE, 'Goleador alla coca-cola', 'Rimedio contro qualsiasi ferita', { quantity: 4 }),
    itemFactory(ITEM_TYPES.CONSUMABLE, 'Cerotto', 'Rimedio contro qualsiasi ferita', { quantity: 10, props: { health: 1 } }),
];

const Item = ({ quantity, name, description }) => {
    const [toggle, setToggle] = useState(false);
    return (
        <Segment onClick={() => setToggle(!toggle)}>
            <div className="flex-1 flex flex-row justify-between">
                <div>
                    {quantity}
                </div>
                <div className="font-bold">
                    {name}
                </div>
                <div>
                    <Icon name={toggle ? Icon.names.CHEVRON_UP : Icon.names.CHEVRON_DOWN} />
                </div>
            </div>
            {toggle && (
                <div className="flex flex-1 flex-row justify-between">
                    <div className="p-2 mt-1" style={{ flex: 3 }}>
                        {description}
                    </div>
                    <div className="p-2 mt-1" style={{ flex: 1 }}>
                        Actions
                    </div>
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