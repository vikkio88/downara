import { questHelper } from '.';


describe('QuestHelper', () => {
    const title = 'some title';
    const description = 'some description';
    describe('Activation', () => {
        it('extract and activate the right info from a quest', () => {
            const quest = {
                title,
                description,
                someStuff: 'stuff'
            };

            expect(questHelper.activate(quest)).toEqual({
                title, description, active: true, finished: false
            });
        });
    });

    describe('Inventory', () => {

        it('updates the money value correctly', () => {
            const inventory = {
                money: 0,
                someThings: 'things'
            };
            let modifiedInventory = questHelper.modifyMoney(inventory, 10)

            expect(modifiedInventory).toEqual({
                money: 10,
                someThings: 'things'
            });

            modifiedInventory = questHelper.modifyMoney(modifiedInventory, -5);

            expect(modifiedInventory).toEqual({
                money: 5,
                someThings: 'things'
            });
        });
        // ↑ Need to make this not happening if the money is lower than the modified amount

        it('updates inventory if the right object is received', () => {
            const inventory = {
                money: 0,
                someOtherThings: 'stuff'
            };

            const quest = {
                inventory: {
                    money: 10
                }
            };

            let modifiedInventory = questHelper.parseInventory(inventory, quest);

            expect(modifiedInventory).toEqual({
                money: 10,
                someOtherThings: 'stuff'
            });

            modifiedInventory = questHelper.parseInventory(inventory);

            expect(modifiedInventory).toEqual({
                money: 10,
                someOtherThings: 'stuff'
            });

            modifiedInventory = questHelper.parseInventory(inventory, { inventory: { yo: 1 } });
            expect(modifiedInventory).toEqual({
                money: 10,
                someOtherThings: 'stuff'
            });
        });
    });

});