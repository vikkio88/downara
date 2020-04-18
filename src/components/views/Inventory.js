import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import { Segment } from './common';
import { LABELS } from 'downara';
import { Icon, Button, Progress } from 'components/common';

const itemFactory = (type, name, description, { quantity = 1, weight = 0, props = {} } = {}) => {
    return {
        name, description,
        quantity, type,
        weight, props,
        actions: ITEM_TYPES_ACTIONS[type],
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
    itemFactory(ITEM_TYPES.WEAPON, 'Cutidduzzu', 'un piccolo coltellino svizzero', { props: { damage: 3 }, weight: 0.3 }),
    itemFactory(ITEM_TYPES.WEARABLE, 'Elmetto Bauli®', 'un elmetto ottenuto dal cartone del panettone Bauli®', { weight: 1 }),
    itemFactory(ITEM_TYPES.QUEST_ITEM, 'Pane', '½ Kg di pane e due panini vuoti'),
    itemFactory(ITEM_TYPES.CONSUMABLE, 'Goleador alla coca-cola', 'Rimedio contro qualsiasi ferita', { quantity: 4, weight: 0.1 }),
    itemFactory(ITEM_TYPES.CONSUMABLE, 'Cerotto', 'Rimedio contro qualsiasi ferita', { quantity: 10, props: { health: 1 } }),
];

const ICON_ITEM_TYPE_MAP = {
    [ITEM_TYPES.QUEST_ITEM]: Icon.names.BOOK,
    [ITEM_TYPES.WEAPON]: '',
    [ITEM_TYPES.WEARABLE]: '',
    [ITEM_TYPES.CONSUMABLE]: '',
    [ITEM_TYPES.USABLE]: '',
};

const ICON_ACTIONS_MAP = {
    [ITEM_ACTIONS.CONSUME]: Icon.names.BOLT,
    [ITEM_ACTIONS.USE]: Icon.names.BOLT,
    [ITEM_ACTIONS.EQUIP]: Icon.names.T_SHIRT,
    [ITEM_ACTIONS.DROP]: Icon.names.TRASH,
};

const Item = ({ quantity, name, description, weight, actions }) => {
    const [toggle, setToggle] = useState(false);
    return (
        <Segment onClick={() => setToggle(!toggle)}>
            <div className="flex-1 flex flex-row justify-between">
                <div>
                    {quantity}
                </div>
                <div className="font-bold">
                    {name} {quantity > 1 && <span>(x {quantity})</span>}
                </div>
                <div>
                    <Icon name={toggle ? Icon.names.CHEVRON_UP : Icon.names.CHEVRON_DOWN} />
                </div>
            </div>
            {toggle && (
                <div className="flex flex-1 flex-row justify-between">
                    <div className="pr-1 pt-2 mt-1" style={{ flex: 3 }}>
                        {description} {weight > 0 && (`${weight * quantity} kg`)}
                    </div>
                    <div className="mt-1 flex flex-row justify-end items-center" style={{ flex: 1 }}>
                        {actions.map((a, i) => <Button key={i}><Icon name={ICON_ACTIONS_MAP[a]} /></Button>)}
                    </div>
                </div>
            )}
        </Segment>
    );
};
const Inventory = () => {
    const { gameState: { inventory } } = useStoreon('gameState');
    const { money, maxWeight } = inventory;
    const weight = items.reduce((acc, { weight, quantity }) => acc + (weight * quantity), 0);
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
            <Progress percentage={weight / maxWeight * 100} label={`${weight.toFixed(2)} / ${maxWeight} KG`} />
            {items.map((item, i) => (<Item key={`item-row-${i}`} {...item} />))}
        </>
    )
};

export default Inventory;